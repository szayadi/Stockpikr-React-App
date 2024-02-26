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
  RadioGroup, // Added Select import
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { getErrorResponse } from '../../helper/errorResponse';
import { IStockQuote } from '../../interfaces/IStockQuote';
import { MinimalWatchlistTicker, Watchlists } from '../../interfaces/IWatchlistModel';
import { StockApiService } from '../../services/StockApiService';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import { useAsyncError } from '../GlobalErrorBoundary';

// Define the prop types for the component
interface AddStockDialogProps {
  addStockSymbol: string;
  watchlistName: string;
  isAddStockDialog: boolean;
  setAddStockDialog: (value: boolean) => void;
  watchlists: Watchlists | undefined;
  setWatchlists: (watchlists: Watchlists) => void;
}

const AddStockDialog: React.FC<AddStockDialogProps> = ({
  addStockSymbol,
  watchlists,
  setWatchlists,
  watchlistName,
  isAddStockDialog,
  setAddStockDialog
}) => {
  const [addStockPrice, setAddStockPrice] = useState('');
  const [stockInfo, setStockInfo] = useState<IStockQuote>();
  const [stockTrackingDays, setStockTrackingDays] = useState(90);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const throwError = useAsyncError();

  const fetchStockData = async (symbol: string): Promise<void> => {
    const response = await StockApiService.fetchDetailedStock(symbol);
    if (!response || getErrorResponse(response)) {
      return;
    }
    setStockInfo(response);
  };

  React.useEffect(() => {
    fetchStockData(addStockSymbol);
  }, [addStockSymbol]);

  const isAddStockPriceValid = () => {
    return addStockPrice !== '';
  };

  const isAddStockIdValid = () => {
    return addStockSymbol !== '';
  };

  const onCancelAddStockDialog = () => {
    setAddStockPrice('');
    setStockTrackingDays(90);
    setAddStockDialog(false);
  };

  const onConfirmAddStockDialog = async () => {
    try {
      if (!addStockSymbol) {
        throw 'Stock symbol cannot be empty';
      }
      if (!watchlists) {
        throw 'Watchlists are empty';
      }
      const ticker: MinimalWatchlistTicker = { symbol: addStockSymbol, alertPrice: Number(addStockPrice) };
      const searchResult = await StockApiService.fetchDetailedStock(ticker.symbol);
      if (!searchResult) {
        throw `Could not find stock with symbol ${ticker.symbol} in the database!`;
      }
      // TODO: handle status code
      await WatchlistApiService.addStockToWatchlist(ticker, watchlistName);
      // after adding, we query the watchlist again and update its data to get the detailed stock info
      const watchlist = await WatchlistApiService.fetchWatchlist(watchlistName);
      if (!watchlist) throw `Cannot find the watchlist ${watchlistName} data after adding new stocks`;
      watchlists[watchlistName] = watchlist.tickers;
      setWatchlists(watchlists);
    } catch (error) {
      throwError(error);
    }
    setAddStockDialog(false);
  };

  return (
    <Dialog open={isAddStockDialog} onClose={() => setAddStockDialog(false)} fullScreen={fullScreen}>
      <DialogTitle>Add a new stock</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Stock symbol: ${addStockSymbol}`}</DialogContentText>
        <DialogContentText>{`Stock company name: ${stockInfo?.name}`}</DialogContentText>
        <DialogContentText>{`Current stock price: $${stockInfo?.price}`}</DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText>At what price would you like to buy the stock?</DialogContentText>
        <TextField
          error={!isAddStockPriceValid()}
          autoFocus
          required
          margin="dense"
          id="stock-price"
          label="Buy price"
          type="number"
          fullWidth
          variant="standard"
          helperText={!isAddStockPriceValid() ? 'Stock price cannot be empty' : ''}
          onChange={(e) => setAddStockPrice(e.target.value)}
        />
      </DialogContent>
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
        <Button onClick={onConfirmAddStockDialog} disabled={!isAddStockIdValid() || !isAddStockPriceValid()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStockDialog;
