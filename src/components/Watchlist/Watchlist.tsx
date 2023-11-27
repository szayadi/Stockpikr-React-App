import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name: string, currentPrice: number, alertPrice: number, nearHigh: number, highest: number) {
  return { name, currentPrice, alertPrice, nearHigh, highest };
}

const rows = [
  createData('COINBASE GLOBAL, INC. (XNAS:COIN)',  115.54 , 47.32, 110.59, 429.54),
  createData('MICROVISION, INC. (XNAS:MVIS)', 2.50, 2.85, 5.80, 28.00),
  createData('XPENG INC. (XNYS:XPEV)', 18.48, 6.61, 19.73, 56.45),
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
