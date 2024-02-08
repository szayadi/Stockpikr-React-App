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
import { serializeError } from 'serialize-error';
import { userID } from '../../helper/constants';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import AddStockDialog from './AddStockDialog';
import AutocompleteComponent from './Autocomplete';
import DeleteWatchListDialog from './DeleteWatchlistDialog';

function createData(symbol: string, currentPrice: number, alertPrice: number, nearHigh: number, highest: number) {
  return { symbol, currentPrice, alertPrice, nearHigh, highest };
}

// const defaultStockSymbol = 'APPLE'; // FIXME:

export default function Watchlist() {
  const [wlKey, setWlKey] = useState('');
  const [wlKeys, setWlKeys] = useState<string[]>([]);
  const [watchlists, setWatchlists] = useState<{ [key: string]: any[] }>();
  const [isAddStockDialog, setAddStockDialog] = useState(false);
  const [isDeleteWatchlistDialog, setDeleteWatchlistDialog] = useState(false);
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
          {watchlists &&
            Object.keys(watchlists).length > 0 &&
            wlKey &&
            watchlists[wlKey].map((row) => (
              <TableRow
                key={row?.symbol}
                onClick={() => {
                  navigate('/quote');
                }}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.symbol}
                </TableCell>
                <TableCell align="right">{row?.currentPrice}</TableCell>
                <TableCell align="right">{row?.alertPrice}</TableCell>
                <TableCell align="right">{row?.nearHigh}</TableCell>
                <TableCell align="right">{row?.highest}</TableCell>
              </TableRow>
            ))}
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
