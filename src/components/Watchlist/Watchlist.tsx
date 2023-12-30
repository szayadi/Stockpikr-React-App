import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import AutocompleteComponent from './Autocomplete';

function createData(name: string, currentPrice: number, alertPrice: number, nearHigh: number, highest: number) {
  return { name, currentPrice, alertPrice, nearHigh, highest };
}

const etfWatchList = [
  createData('COINBASE GLOBAL, INC. (XNAS:COIN)', 115.54, 47.32, 110.59, 429.54),
  createData('MICROVISION, INC. (XNAS:MVIS)', 2.5, 2.85, 5.8, 28.0),
  createData('XPENG INC. (XNYS:XPEV)', 18.48, 6.61, 19.73, 56.45)
];

const stocksWatchList = [
  createData('CHARGEPOINT HOLDINGS, INC. (XNYS:CHPT)', 3, 4.32, 2.59, 1.54),
  createData('LUCID GROUP, INC. (XNAS:LCID)', 1.287, 15.48, 7.28, 5.1823)
];

const defaultWatchlists: { [key: string]: any[] } = {
  'ETF WL': etfWatchList,
  'Stocks WL': stocksWatchList
};

export function Watchlist() {
  const [wlKey, setWlKey] = useState('ETF WL');
  const [wlKeys, setWlKeys] = useState(Object.keys(defaultWatchlists));
  const [watchlists, setWatchlists] = useState(defaultWatchlists);
  const [addStockId, setAddStockId] = useState('');
  const [addStockPrice, setAddStockPrice] = useState('');
  const [stockTrackingDays, setStockTrackingDays] = useState(90);
  const [isAddStockDialog, setAddStockDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleAppendNewKey = (key: string) => {
    if (key) {
      watchlists[key] = [];
      setWatchlists(watchlists);
      setWlKeys(Object.keys(watchlists));
      setWlKey(key);
    }
  };

  const handleOnClickSettings = () => {
    console.log('Settings');
  };

  const handleClickAddStock = () => {
    setAddStockDialog(true);
    console.log('Add');
  };

  const handleClickDeleteStock = () => {
    console.log('Delete');
  };

  const onCancelAddStockDialog = () => {
    setAddStockId('');
    setAddStockPrice('');
    setStockTrackingDays(90);
    setAddStockDialog(false);
  };

  const isAddStockPriceValid = () => {
    return addStockPrice !== '';
  };

  const isAddStockIdValid = () => {
    return addStockId !== '';
  };

  const onConfirmAddStockDialog = () => {
    console.log({ addStockId, addStockPrice, stockTrackingDays });
  };

  return (
    <TableContainer component={Paper}>
      <Box display="flex" flexDirection="row">
        <AutocompleteComponent watchlistKeys={wlKeys} handleAppendNewKey={handleAppendNewKey} setWlKey={setWlKey} />
        <ButtonGroup variant="text" aria-label="text button group">
          <Button>
            <AddIcon onClick={handleClickAddStock} fontSize="medium" />
          </Button>
          <Button>
            {' '}
            <RemoveIcon onClick={handleClickDeleteStock} fontSize="medium" />
          </Button>
          <Button onClick={handleOnClickSettings}>
            <MoreVertIcon fontSize="medium" />
          </Button>
        </ButtonGroup>
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Alert Price</TableCell>
            <TableCell align="right">Near High</TableCell>
            <TableCell align="right">Highest</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchlists[wlKey].map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.currentPrice}</TableCell>
              <TableCell align="right">{row.alertPrice}</TableCell>
              <TableCell align="right">{row.nearHigh}</TableCell>
              <TableCell align="right">{row.highest}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </TableContainer>
  );
}
