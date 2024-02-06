import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import { useAsyncError } from '../GlobalErrorBoundary';
import AddStockDialog from './AddStockDialog';
import AutocompleteComponent from './Autocomplete';
import DeleteWatchListDialog from './DeleteWatchlistDialog';

export interface TempWatchListData {
  symbol: string;
  currentPrice: number;
  alertPrice: number;
  nearHigh: number;
  highest: number;
}
function createData(symbol: string, currentPrice: number, alertPrice: number, nearHigh: number, highest: number) {
  return { symbol, currentPrice, alertPrice, nearHigh, highest };
}

const userID = '000000000000000000001'; // FIXME: change to actual user id when the user feature is completed
// const defaultStockSymbol = 'APPLE'; // FIXME:

export default function Watchlist() {
  const [wlKey, setWlKey] = useState('');
  const [wlKeys, setWlKeys] = useState<string[]>([]);
  const [watchLists, setWatchLists] = useState<{ [key: string]: TempWatchListData[] }>();
  const [isAddStockDialog, setAddStockDialog] = useState(false);
  const [isDeleteWatchListDialog, setDeleteWatchlistDialog] = useState(false);
  const navigate = useNavigate();
  const throwError = useAsyncError();

  useEffect(() => {
    const queryWatchLists = async () => {
      const wls = await WatchlistApiService.fetchWatchListsByUserId(userID);
      const tempWls: { [key: string]: TempWatchListData[] } = {};
      wls.forEach((wl, i) => {
        if (i === 0) setWlKey(wl.name);
        tempWls[wl.name] = [createData(wl.name, 0, 0, 0, 0)]; // FIXME: the watch list query should also get list of stocks as well
      });
      setWatchLists(tempWls);
      setWlKeys(Object.keys(tempWls));
    };
    queryWatchLists().catch((error) => {
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
        watchLists[value] = [createData(name, 0, 0, 0, 0)];
        setWatchLists(watchLists);
        setWlKeys(Object.keys(watchLists));
        setWlKey(value);
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
      setWatchLists(watchLists);
      setWlKeys(keys);
      setWlKey('');
    }
    setDeleteWatchlistDialog(false);
  };

  const handleClickAddStock = () => {
    setAddStockDialog(true);
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
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Alert Price</TableCell>
            <TableCell align="right">Near High</TableCell>
            <TableCell align="right">Highest</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchLists &&
            Object.keys(watchLists).length > 0 &&
            wlKey &&
            watchLists[wlKey].map((row) => (
              <TableRow
                key={row.symbol}
                onClick={() => {
                  navigate('/quote');
                }}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.symbol}
                </TableCell>
                <TableCell align="right">{row.currentPrice}</TableCell>
                <TableCell align="right">{row.alertPrice}</TableCell>
                <TableCell align="right">{row.nearHigh}</TableCell>
                <TableCell align="right">{row.highest}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <AddStockDialog watchlistName={wlKey} isAddStockDialog={isAddStockDialog} setAddStockDialog={setAddStockDialog} />
      <DeleteWatchListDialog
        watchListName={wlKey}
        isDeleteWatchListDialog={isDeleteWatchListDialog}
        handleCloseDeleteWatchListDialog={handleCloseDeleteWatchlistDialog}
      />
    </TableContainer>
  );
}
