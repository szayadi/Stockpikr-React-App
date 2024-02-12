import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Ticker } from '../../interfaces/IWatchlistModel';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import { useAsyncError } from '../GlobalErrorBoundary';
import AddStockDialog from './AddStockDialog';
import AutocompleteComponent from './Autocomplete';
import DeleteWatchListDialog from './DeleteWatchlistDialog';
import { EnhancedTableToolbar, WatchlistTableHeadWithCheckbox } from './THeadCheckBoxAndSort';

type Order = 'asc' | 'desc';

export interface WatchListData {
  symbol: string;
  currentPrice: number;
  alertPrice: number;
  nearHigh: number;
  highest: number;
}

const userID = '000000000000000000001'; // FIXME: change to actual user id when the user feature is completed
// const defaultStockSymbol = 'APPLE'; // FIXME:

export default function Watchlist() {
  // watchLists state props
  const [wlKey, setWlKey] = useState('');
  const [wlKeys, setWlKeys] = useState<string[]>([]);
  const [watchLists, setwatchLists] = useState<{ [key: string]: WatchListData[] }>();
  const [isAddStockDialog, setAddStockDialog] = useState(false);
  const [isDeleteWatchlistDialog, setDeleteWatchlistDialog] = useState(false);

  // table props
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Ticker>('symbol');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const isSelected = (symbol: string) => selected.indexOf(symbol) !== -1;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Ticker) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = watchLists ? watchLists[wlKey].map((n) => n.symbol) : [];
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const throwError = useAsyncError();

  const querywatchLists = async () => {
    const wls = await WatchlistApiService.fetchWatchListsByUserId(userID);
    const tempWls: { [key: string]: any[] } = {};
    wls.forEach((wl, i) => {
      if (i === 0) setWlKey(wl.name);
      if (!tempWls[wl.name]) {
        tempWls[wl.name] = [];
      }
      tempWls[wl.name] = wl.tickers;
    });
    setWlKeys(Object.keys(tempWls));
    setwatchLists(tempWls);
  };

  useEffect(() => {
    querywatchLists().catch((error) => {
      throwError(error);
    });
  }, []);

  const handleCreateNewWatchlist = async (value: string) => {
    if (value && watchLists) {
      try {
        const name = await WatchlistApiService.createWatchlist({
          name: value,
          tickers: [],
          userID
        });
        if (!name) {
          throw Error('Watchlist Id is empty after creating');
        }
        watchLists[name] = [];
        setwatchLists(watchLists);
        setWlKeys(Object.keys(watchLists));
        setWlKey(name);
        setWlKey(name);
      } catch (error) {
        //console.error(JSON.stringify(serializeError(error)));
      }
    }
  };

  // const handleOpenDeleteWatchlistDialog = () => {
  //   setDeleteWatchlistDialog(true);
  // };

  const handleCloseDeleteWatchlistDialog = (name?: string) => {
    if (name && watchLists) {
      // re-render with deleted watch list removed from our state so that we don't need to query watch lists again
      delete watchLists[name];
      const keys = Object.keys(watchLists);
      setwatchLists(watchLists);
      setWlKeys(keys);
      setWlKey('');
    }
    setDeleteWatchlistDialog(false);
  };

  const handleClickAddStock = () => {
    setAddStockDialog(true);
  };

  const handleClick = (event: React.MouseEvent<unknown>, symbol: string) => {
    const selectedIndex = selected.indexOf(symbol);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, symbol);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ width: '95%', backgroundColor: 'white', borderRadius: '10px', margin: '20px' }}
    >
      <Box display="flex" flexDirection="row">
        <AutocompleteComponent
          watchListKeys={wlKeys}
          handleAppendNewKey={handleCreateNewWatchlist}
          setWlKey={setWlKey}
        />
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>
            <AddIcon onClick={handleClickAddStock} fontSize="medium" />
          </Button>
          <Button>
            {' '}
            <DeleteIcon onClick={() => setDeleteWatchlistDialog(true)} fontSize="medium" />
          </Button>
        </ButtonGroup>
      </Box>
      <EnhancedTableToolbar numSelected={selected.length} />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <WatchlistTableHeadWithCheckbox
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={watchLists && watchLists[wlKey] ? watchLists[wlKey].length : 0}
        />
        <TableBody>
          {watchLists &&
            Object.keys(watchLists).length > 0 &&
            wlKey &&
            watchLists[wlKey].map((row, index) => {
              const isItemSelected = isSelected(row.symbol);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                // TODO: set unique key for the watchlist tickers
                <TableRow
                  key={index}
                  // onClick={() => {
                  //   navigate('/quote');
                  // }}
                  onClick={(event) => handleClick(event, row.symbol)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.symbol}
                  </TableCell>
                  <TableCell align="right">{row.currentPrice}</TableCell>
                  <TableCell align="right">{row.alertPrice}</TableCell>
                  <TableCell align="right">{row.nearHigh}</TableCell>
                  <TableCell align="right">{row.highest}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <AddStockDialog
        watchlistName={wlKey}
        watchlists={watchLists}
        setWatchlists={setwatchLists}
        isAddStockDialog={isAddStockDialog}
        setAddStockDialog={setAddStockDialog}
      />
      <DeleteWatchListDialog
        watchListName={wlKey}
        isDeleteWatchListDialog={isDeleteWatchlistDialog}
        handleCloseDeleteWatchListDialog={handleCloseDeleteWatchlistDialog}
      />
    </TableContainer>
  );
}
