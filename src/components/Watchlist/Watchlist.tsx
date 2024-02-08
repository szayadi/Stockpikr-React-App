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
import { WatchlistApiService } from '../../services/WatchlistApiService';
import AddStockDialog from './AddStockDialog';
import AutocompleteComponent from './Autocomplete';
import DeleteWatchListDialog from './DeleteWatchlistDialog';

function createData(symbol: string, currentPrice: number, alertPrice: number, nearHigh: number, highest: number) {
  return { symbol, currentPrice, alertPrice, nearHigh, highest };
}

const userID = '000000000000000000001'; // FIXME: change to actual user id when the user feature is completed
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
    // const wls = [
    //   {
    //     _id: 'randomId1',
    //     watchlistName: 'watchlist2',
    //     userID: 'randomUserId1',
    //     tickers: [
    //       {
    //         symbol: 'AAPL',
    //         alertPrice: 125,
    //         _id: 'randomId2'
    //       }
    //     ]
    //   },
    //   {
    //     _id: 'randomId3',
    //     watchlistName: 'Watchlist_FAANG',
    //     userID: 'randomUserId1',
    //     tickers: [
    //       {
    //         symbol: 'NFLX',
    //         alertPrice: 420,
    //         _id: 'randomId4'
    //       },
    //       {
    //         symbol: 'META',
    //         alertPrice: 304,
    //         _id: 'randomId5'
    //       },
    //       {
    //         symbol: 'AAPL',
    //         alertPrice: 69,
    //         _id: 'randomId6'
    //       },
    //       {
    //         symbol: 'AMZN',
    //         alertPrice: 50,
    //         _id: 'randomId7'
    //       }
    //     ]
    //   },
    //   {
    //     _id: 'randomId8',
    //     watchlistName: 'Temp_Watchlist3',
    //     userID: 'randomUserId1',
    //     tickers: [
    //       {
    //         symbol: 'AAPL',
    //         alertPrice: 3000,
    //         _id: 'randomId9'
    //       }
    //     ]
    //   }
    // ];

    const tempWls: { [key: string]: any[] } = {};
    wls?.forEach((wl, i) => {
      if (i === 0) setWlKey(wl.watchlistName);
      if (!tempWls[wl.watchlistName]) {
        tempWls[wl.watchlistName] = [];
      }
      wl.tickers?.forEach((ticker, j) => {
        tempWls[wl.watchlistName].push(createData(ticker.symbol, j, ticker.alertPrice, 0, 0));
      });
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
        // const tempWls = watchlists;
        // tempWls[name]
        // watchlists[watchlistName] = [createData(name, 0, 0, 0, 0)];
        // setWatchlists(watchlists);
        // setWlKeys(Object.keys(watchlists));
        // setWlKey(watchlistName);
        queryWatchlists();
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
      <AddStockDialog watchlistName={wlKey} isAddStockDialog={isAddStockDialog} setAddStockDialog={setAddStockDialog} />
      <DeleteWatchListDialog
        watchlistName={wlKey}
        isDeleteWatchlistDialog={isDeleteWatchlistDialog}
        handleCloseDeleteWatchlistDialog={handleCloseDeleteWatchlistDialog}
      />
    </TableContainer>
  );
}
