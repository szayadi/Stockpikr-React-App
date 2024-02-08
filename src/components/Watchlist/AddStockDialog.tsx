import * as React from 'react';
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
import { useState } from 'react';

// Define the prop types for the component
interface AddStockDialogProps {
  watchlistName: string;
  isAddStockDialog: boolean;
  setAddStockDialog: (value: boolean) => void;
}

const AddStockDialog: React.FC<AddStockDialogProps> = ({ isAddStockDialog, setAddStockDialog }) => {
  const [addStockId, setAddStockId] = useState('');
  const [addStockPrice, setAddStockPrice] = useState('');
  const [stockTrackingDays, setStockTrackingDays] = useState(90);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const isAddStockPriceValid = () => {
    return addStockPrice !== '';
  };

  const isAddStockIdValid = () => {
    return addStockId !== '';
  };

  const onCancelAddStockDialog = () => {
    setAddStockId('');
    setAddStockPrice('');
    setStockTrackingDays(90);
    setAddStockDialog(false);
  };

  const onConfirmAddStockDialog = () => {
    //console.log({ addStockId, addStockPrice, stockTrackingDays });
  };

  return (
    <Dialog open={isAddStockDialog} onClose={() => setAddStockDialog(false)} fullScreen={fullScreen}>
      <DialogTitle>Add a new stock</DialogTitle>
      <DialogContent>
        <DialogContentText>To add a new stock, please enter the stock's unique Id</DialogContentText>
        <TextField
          error={!isAddStockIdValid()}
          autoFocus
          required
          margin="dense"
          id="stock-id"
          label="Stock Id"
          type="text"
          fullWidth
          variant="standard"
          helperText={!isAddStockIdValid() ? 'Stock Id cannot be empty' : ''}
          onChange={(e) => setAddStockId(e.target.value)}
        />
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
          type="text"
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
