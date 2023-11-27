import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function createData(name: string, currentPrice: number, alertPrice: number, nearHigh: number, highest: number) {
  return { name, currentPrice, alertPrice, nearHigh, highest };
}

const rows = [
  createData('COINBASE GLOBAL, INC. (XNAS:COIN)', 115.54, 47.32, 110.59, 429.54),
  createData('MICROVISION, INC. (XNAS:MVIS)', 2.5, 2.85, 5.8, 28.0),
  createData('XPENG INC. (XNYS:XPEV)', 18.48, 6.61, 19.73, 56.45)
];

export function Watchlist() {
  return (
    <TableContainer component={Paper}>
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
          {rows.map((row) => (
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
