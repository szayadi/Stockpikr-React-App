import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveIcon from '@mui/icons-material/Remove';
import {
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
    console.log('Add');
  };

  const handleClickDeleteStock = () => {
    console.log('Delete');
  };

  return (
    <TableContainer component={Paper}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
      </div>
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
    </TableContainer>
  );
}
