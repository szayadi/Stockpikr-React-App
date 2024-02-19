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
import { useEffect, useMemo, useState } from 'react';
import { serializeError } from 'serialize-error';
import { userID } from '../../helper/constants';
import { calPriceDifferentPercentage } from '../../helper/utils';
import { WatchlistTicker, Watchlists } from '../../interfaces/IWatchlistModel';
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

export default function Watchlist() {
  // watchLists state props
  const [wlKey, setWlKey] = useState('');
  const [wlKeys, setWlKeys] = useState<string[]>([]);
  const [watchLists, setWatchLists] = useState<Watchlists>({});
  const [isAddStockDialog, setAddStockDialog] = useState(false);
  const [isDeleteWatchlistDialog, setDeleteWatchlistDialog] = useState(false);

  // table props
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof WatchlistTicker>('symbol');
  const [selected, setSelected] = useState<string[]>([]);
  // const [page, setPage] = useState(0);
  // const [dense, setDense] = useState(false);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const isSelected = (symbol: string) => selected.indexOf(symbol) !== -1;

  const refreshWatchlist = (watchlists: Watchlists) => {
    setWatchLists(watchlists);
    setWlKeys(Object.keys(watchlists));
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof WatchlistTicker) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked || !watchLists) {
      if (watchLists[wlKey] == null) {
        setSelected([]);
        return;
      }
      const newSelected = watchLists[wlKey].map((n) => n.symbol);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - wlKeys.length) : 0;

  const visibleWatchLists = useMemo(
    () => (watchLists[wlKey] ? watchLists[wlKey].sort(getComparator(order, orderBy)) : []),
    [order, orderBy, wlKey, watchLists[wlKey]]
  );

  const throwError = useAsyncError();

  const queryWatchLists = async () => {
    const wls = await WatchlistApiService.fetchWatchlistsByUserId(userID);
    if (Array.isArray(wls)) {
      let tempWls: Watchlists = {};
      wls.forEach((wl, i) => {
        if (i === 0) setWlKey(wl.watchlistName);
        if (!tempWls[wl.watchlistName]) {
          tempWls[wl.watchlistName] = [];
        }
        tempWls[wl.watchlistName] = wl.tickers;
      });
      refreshWatchlist(tempWls);
    }
  };

  useEffect(() => {
    queryWatchLists().catch((error) => {
      // throwError(error);
    });
  }, []);

  const handleCreateNewWatchlist = async (value: string) => {
    if (value && watchLists) {
      try {
        const name = await WatchlistApiService.createWatchlist({
          watchlistName: value,
          tickers: [],
          userID
        });
        if (!name) {
          throw Error('Watchlist Id is empty after creating');
        }
        watchLists[value] = [];
        refreshWatchlist(watchLists);
        setWlKey(value);
      } catch (error) {
        throw JSON.stringify(serializeError(error));
      }
    }
  };

  const handleCloseDeleteWatchlistDialog = (name?: string) => {
    if (name && watchLists) {
      // re-render with deleted watchlist removed from our state so that we dont need to query watchlists again
      delete watchLists[name];
      refreshWatchlist(watchLists);
      setWlKey('');
    }
    setDeleteWatchlistDialog(false);
  };

  const handleClickAddStock = () => {
    setAddStockDialog(true);
  };

  const handleDeleteStocks = async () => {
    const patchResult = await WatchlistApiService.deleteStocksInWatchlist(wlKey, selected);
    console.log('patch result: ', patchResult);
    if (patchResult && patchResult.matchedCount > 0 && patchResult.modifiedCount > 0) {
      const tickers = watchLists[wlKey].filter((ticker) => !selected.includes(ticker.symbol));
      watchLists[wlKey] = tickers;
      refreshWatchlist(watchLists);
      setSelected([]);
    } else {
      // TODO: handle delete stocks error here
      throw 'Cannot delete stocks';
    }
  };

  const handleSelectStock = (event: React.MouseEvent<unknown>, symbol: string) => {
    const selectedIndex = selected.indexOf(symbol);
    let newSelected: string[] = [];

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
          watchListKey={wlKey}
          handleAppendNewKey={handleCreateNewWatchlist}
          setWlKey={setWlKey}
        />
        <ButtonGroup variant="text" aria-label="text button group">
          <Button disabled={wlKeys.length === 0}>
            <AddIcon onClick={handleClickAddStock} fontSize="medium" />
          </Button>
          <Button disabled={wlKeys.length === 0}>
            {' '}
            <DeleteIcon onClick={() => setDeleteWatchlistDialog(true)} fontSize="medium" />
          </Button>
        </ButtonGroup>
      </Box>
      <EnhancedTableToolbar numSelected={selected.length} handleDeleteStocks={handleDeleteStocks} />
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
            visibleWatchLists.map((row, index) => {
              const isItemSelected = isSelected(row.symbol);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                // TODO: set unique key for the watchlist tickers
                <TableRow
                  key={index}
                  // onClick={() => {
                  //   navigate('/quote');
                  // }}
                  onClick={(event) => handleSelectStock(event, row.symbol)}
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
                  <TableCell align="right">{row.exchange}</TableCell>
                  <TableCell align="right">{row.alertPrice}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{calPriceDifferentPercentage(row.price, row.alertPrice)}</TableCell>
                  <TableCell align="right">{row.previousClose}</TableCell>
                  <TableCell align="right">{`${row.changesPercentage}%`}</TableCell>
                  <TableCell align="right">{row.dayHigh}</TableCell>
                  <TableCell align="right">{calPriceDifferentPercentage(row.dayHigh, row.price)}</TableCell>
                  <TableCell align="right">{row.yearHigh}</TableCell>
                  <TableCell align="right">{calPriceDifferentPercentage(row.yearHigh, row.price)}</TableCell>
                  <TableCell align="right">{row.dayLow}</TableCell>
                  <TableCell align="right">{calPriceDifferentPercentage(row.dayLow, row.price)}</TableCell>
                  <TableCell align="right">{row.yearLow}</TableCell>
                  <TableCell align="right">{calPriceDifferentPercentage(row.yearLow, row.price)}</TableCell>
                </TableRow>
              );
            })}
          {/* {emptyRows > 0 && (
            <TableRow
              style={{
                height: (dense ? 33 : 53) * emptyRows
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
      </Table>
      <AddStockDialog
        watchlistName={wlKey}
        watchlists={watchLists}
        setWatchlists={setWatchLists}
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
