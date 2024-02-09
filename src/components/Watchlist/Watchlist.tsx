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
import { useNavigate } from 'react-router-dom';
import { serializeError } from 'serialize-error';
import { userID } from '../../helper/constants';
import { Ticker } from '../../interfaces/IWatchlistModel';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import AddStockDialog from './AddStockDialog';
import AutocompleteComponent from './Autocomplete';
import DeleteWatchListDialog from './DeleteWatchlistDialog';
import { EnhancedTableToolbar, WatchlistTableHeadWithCheckbox } from './THeadCheckBoxAndSort';

type Order = 'asc' | 'desc';

export default function Watchlist() {
  // watchlists state props
  const [wlKey, setWlKey] = useState('');
  const [wlKeys, setWlKeys] = useState<string[]>([]);
  const [watchlists, setWatchlists] = useState<{ [key: string]: any[] }>();
  const [isAddStockDialog, setAddStockDialog] = useState(false);
  const [isDeleteWatchlistDialog, setDeleteWatchlistDialog] = useState(false);

  // table props
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Ticker>('symbol');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isSelected = (symbol: string) => selected.indexOf(symbol) !== -1;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Ticker) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = watchlists ? watchlists[wlKey].map((n) => n.symbol) : [];
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const navigate = useNavigate();

  const queryWatchlists = async () => {
    const wls = await WatchlistApiService.fetchWatchlistsByUserId(userID);
    let tempWls: { [key: string]: any[] } = {};
    wls.forEach((wl, i) => {
      if (i === 0) setWlKey(wl.watchlistName);
      if (!tempWls[wl.watchlistName]) {
        tempWls[wl.watchlistName] = [];
      }
      tempWls[wl.watchlistName] = wl.tickers;
    });
    setWlKeys(Object.keys(tempWls));
    setWatchlists(tempWls);
  };

  useEffect(() => {
    queryWatchlists();
  }, []);

  const handleCreateNewWatchlist = async (watchlistName: string) => {
    if (watchlistName && watchlists) {
      try {
        const name = await WatchlistApiService.createWatchlist({
          watchlistName,
          tickers: [],
          userID
        });
        if (!name) {
          throw Error('Watchlist Id is empty after creating');
        }
        watchlists[watchlistName] = [];
        setWatchlists(watchlists);
        setWlKeys(Object.keys(watchlists));
        setWlKey(watchlistName);
        // queryWatchlists();
        setWlKey(name);
      } catch (error) {
        alert(JSON.stringify(serializeError(error)));
      }
    }
  };

  // const handleOpenDeleteWatchlistDialog = () => {
  //   setDeleteWatchlistDialog(true);
  // };

  const handleCloseDeleteWatchlistDialog = (watchlistName?: string) => {
    if (watchlistName && watchlists) {
      // re-render with deleted watchlist removed from our state so that we dont need to query watchlists again
      delete watchlists[watchlistName];
      const keys = Object.keys(watchlists);
      setWatchlists(watchlists);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
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
          rowCount={watchlists ? watchlists[wlKey].length : 0}
        />
        <TableBody>
          {watchlists &&
            Object.keys(watchlists).length > 0 &&
            wlKey &&
            watchlists[wlKey].map((row, index) => {
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
        watchlists={watchlists}
        setWatchlists={setWatchlists}
        isAddStockDialog={isAddStockDialog}
        setAddStockDialog={setAddStockDialog}
      />
      <DeleteWatchListDialog
        watchlistName={wlKey}
        isDeleteWatchlistDialog={isDeleteWatchlistDialog}
        handleCloseDeleteWatchlistDialog={handleCloseDeleteWatchlistDialog}
      />
    </TableContainer>
  );
}
