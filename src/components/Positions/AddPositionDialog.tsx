import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    useMediaQuery,
    useTheme,
    Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import { useState } from 'react';
import { getErrorResponse } from '../../helper/errorResponse';
import { Positions } from '../../interfaces/IPositionsModel';
import { IStockQuote } from '../../interfaces/IStockQuote';
import { PositionsApiService } from '../../services/PositionsApiService';
import { StockApiService } from '../../services/StockApiService';
import { useAsyncError } from '../GlobalErrorBoundary';

interface AddPositionDialogProps {
    addStockSymbol: string;
    isAddStockDialog: boolean;
    setAddStockDialog: (value: boolean) => void;
    positions: Positions;
    setPositions: (positions: Positions) => void;
}

const AddPositionDialog: React.FC<AddPositionDialogProps> = ({
    addStockSymbol,
    positions,
    setPositions,
    isAddStockDialog,
    setAddStockDialog
}) => {
    const [addStockPrice, setAddStockPrice] = useState('');
    const [addStockQuantity, setAddStockQuantity] = useState('');
    const [addStockDate, setAddStockDate] = useState<Date | null>();
    const [stockInfo, setStockInfo] = useState<IStockQuote>();
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

    const isAddStockQuantityValid = () => {
        return addStockQuantity !== '';
    };

    const isAddStockDateValid = () => {
        return addStockQuantity !== '';
    };

    const onCancelAddStockDialog = () => {
        setAddStockPrice('');
        setAddStockQuantity('');
        setAddStockDialog(false);
    };

    const onConfirmAddStockDialog = async () => {
        try {
            if (!addStockSymbol || !addStockPrice || !addStockQuantity) {
                throw new Error('Stock symbol, price, and quantity cannot be empty');
            }

            const tickers = {
                symbol: addStockSymbol,
                purchasePrice: Number(addStockPrice),
                quantity: Number(addStockQuantity),
                price: 0,
                purchaseDate: addStockDate ? new Date(addStockDate) : null,
                priceChange: 0,
                gainOrLoss: 0,
                marketValue: 0,
            };

            const searchResult = await StockApiService.fetchDetailedStock(tickers.symbol);
            if (!searchResult) {
                throw new Error(`Could not find stock with symbol ${tickers.symbol} in the database!`);
            }

            await PositionsApiService.addStockToPurchasedStocks(tickers);

            const updatedPurchasedStocks = await PositionsApiService.fetchPurchasedStocksByUserId();
            if (!updatedPurchasedStocks) {
                throw new Error(`Cannot find the purchased stocks data after adding new stocks`);
            }

            const positions: Positions = {};
            updatedPurchasedStocks[0].tickers.forEach(ticker => {
                if (!positions[ticker.symbol]) {
                    positions[ticker.symbol] = [];
                }
                positions[ticker.symbol].push(ticker);
            });

            setPositions(positions);
        } catch (error) {
            throwError(error);
        }
        setAddStockDialog(false);
    };


    return (
        <Dialog open={isAddStockDialog} onClose={() => setAddStockDialog(false)} fullScreen={fullScreen}>
            <DialogTitle>Add a new stock</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To add a new stock, please enter the Buy Price, and Quantity
                </DialogContentText>
                <DialogContent>
                    <Typography variant="body1" style={{ marginBottom: 8 }}>
                        Stock company name: {stockInfo?.name}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: 8 }}>
                        Current stock price: ${stockInfo?.price}
                    </Typography>
                </DialogContent>
            </DialogContent>
            <DialogContent>
                <DialogContentText>At what price did you buy the stock?</DialogContentText>
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
            <DialogContent>
                <DialogContentText>How many stocks did you purchase?</DialogContentText>
                <TextField
                    error={!isAddStockQuantityValid()}
                    autoFocus
                    required
                    margin="dense"
                    id="stock-quantity"
                    label="Quantity"
                    type="text"
                    fullWidth
                    variant="standard"
                    helperText={!isAddStockQuantityValid() ? 'Quantity cannot be empty' : ''}
                    onChange={(e) => setAddStockQuantity(e.target.value)}
                />
            </DialogContent>
            <DialogContent>
                <DialogContentText style={{ marginBottom: 2 }}>When did you make your purchase?</DialogContentText>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Purchase Date"
                    onChange={(newValue: Date | null) => setAddStockDate(newValue)}
                />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancelAddStockDialog}>Cancel</Button>
                <Button onClick={onConfirmAddStockDialog} disabled={!isAddStockIdValid() || !isAddStockPriceValid() || !isAddStockQuantityValid()}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPositionDialog;
