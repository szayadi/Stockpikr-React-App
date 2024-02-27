import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Watchlists } from '../../interfaces/IWatchlistModel';
import { StockApiService } from '../../services/StockApiService';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import { useAppDispatch } from '../../store/hooks';
import { addWatchlistRedux } from '../../store/slices/watchlistSlice';
import { useAsyncError } from '../GlobalErrorBoundary';
import WatchlistTickersSearchBar from './WatchlistTickersSearchBar';

// Define the prop types for the component
interface AddStockDialogProps {
  watchlistName?: string;
  isAddStockDialog: boolean;
  setAddStockDialog: (value: boolean) => void;
  watchlists?: Watchlists | undefined;
  setWatchlists?: (watchlists: Watchlists) => void;
  isOnStockPage?: boolean;
  stockSymbol?: string;
}

const AddStockDialog: React.FC<AddStockDialogProps> = ({
  watchlists,
  setWatchlists,
  watchlistName,
  isAddStockDialog,
  setAddStockDialog,
  isOnStockPage,
  stockSymbol
}) => {
  const [addStockSymbol, setAddStockSymbol] = useState('');
  const [addStockPrice, setAddStockPrice] = useState('');
  const [wlName, setWlName] = useState('');
  const [stockTrackingDays, setStockTrackingDays] = useState(90);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const throwError = useAsyncError();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setWlName(watchlistName ?? '');
    setAddStockSymbol(stockSymbol ?? '');
  }, []);

  const isAddStockPriceValid = () => {
    return addStockPrice !== '';
  };

  const isAddWatchlistNameValid = () => {
    return wlName !== '';
  };

  const isAddStockIdValid = () => {
    return addStockSymbol !== '';
  };

  const onCancelAddStockDialog = () => {
    setAddStockSymbol('');
    setAddStockPrice('');
    setStockTrackingDays(90);
    setAddStockDialog(false);
  };

  const onConfirmAddStockDialog = async () => {
    try {
      if (!addStockSymbol) {
        throw 'Stock symbol cannot be empty';
      }
      if (!isOnStockPage && (!watchlists || !setWatchlists)) {
        throw 'Watchlists are empty';
      }
      if (!wlName) {
        throw 'Watchlist name is empty';
      }
      const tickers = [{ symbol: addStockSymbol, alertPrice: Number(addStockPrice) }];
      const searchResult = await StockApiService.fetchDetailedStock(tickers[0].symbol);
      if (!searchResult) {
        throw `Could not find stock with symbol ${tickers[0].symbol} in the database!`;
      }
      // TODO: handle status code
      await WatchlistApiService.addStockToWatchlist(tickers, wlName);
      // after adding, we query the watchlist again and update its data to get the detailed stock info
      const watchlist = await WatchlistApiService.fetchWatchlist(wlName);
      if (!watchlist) throw `Cannot find the watchlist ${wlName} data after adding new stocks`;
      if (watchlists && setWatchlists) {
        watchlists[wlName] = watchlist.tickers;
        setWatchlists(watchlists);
      }
      dispatch(addWatchlistRedux(watchlist));
    } catch (error) {
      throwError(error);
    }
    setAddStockDialog(false);
  };

  const handleBtnDisabled = () => {
    return isOnStockPage
      ? !isAddStockPriceValid() || !isAddWatchlistNameValid()
      : !isAddStockIdValid() || !isAddStockPriceValid();
  };

  return (
    <Dialog open={isAddStockDialog} onClose={() => setAddStockDialog(false)} fullScreen={fullScreen}>
      <DialogTitle>Add a new stock</DialogTitle>
      {!isOnStockPage && (
        <DialogContent>
          <DialogContentText>
            To add a new stock, please select a watchlist and enter the stock's Ticker and Buy Price
          </DialogContentText>
          <DialogContentText style={{ marginTop: '10px', marginBottom: '10px' }}>Stock Symbol</DialogContentText>
          <WatchlistTickersSearchBar setAddStockSymbol={setAddStockSymbol} />
        </DialogContent>
      )}
      <DialogContent>
        <DialogContentText>At what price would you like to buy the stock?</DialogContentText>
        <TextField
          error={!isAddStockPriceValid()}
          autoFocus
          required
          margin="dense"
          id="stock-price"
          label="Buy price"
          type="text"
          fullWidth
          variant="standard"
          helperText={!isAddStockPriceValid() ? 'Stock price cannot be empty' : ''}
          onChange={(e) => setAddStockPrice(e.target.value)}
        />
      </DialogContent>
      {isOnStockPage && (
        <DialogContent>
          <DialogContentText>Enter your watchlist name</DialogContentText>
          <TextField
            error={!isAddWatchlistNameValid()}
            autoFocus
            required
            margin="dense"
            id="watchlist-name"
            label="Watchlist name"
            type="text"
            fullWidth
            variant="standard"
            helperText={!isAddStockPriceValid() ? 'Watchlist name cannot be empty' : ''}
            onChange={(e) => setWlName(e.target.value)}
          />
        </DialogContent>
      )}
      <DialogContent>
        <DialogContentText>
          How many days? (90 days or 180 days) would you like to track the stock? (For near-term tracking)
        </DialogContentText>
        <FormControl>
          <RadioGroup
            aria-labelledby="track-days"
            defaultValue="female"
            name="radio-buttons-group"
            row
            value={stockTrackingDays}
            onChange={(e) => setStockTrackingDays(+e.target.value)}
          >
            <FormControlLabel value={90} control={<Radio />} label="90 days" />
            <FormControlLabel value={180} control={<Radio />} label="180 days" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelAddStockDialog}>Cancel</Button>
        <Button onClick={onConfirmAddStockDialog} disabled={handleBtnDisabled()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStockDialog;
