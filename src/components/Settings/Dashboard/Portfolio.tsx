import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import React from 'react';

function createPortfolioData(
  symbol: string,
  name: string,
  quantity: number,
  avgPrice: number,
  marketCap?: string,
  balance?: number,
  price?: number,
  sevenDayChange?: number,
  thirtyDayChange?: number,
  oneYearChange?: number,
  todayChangePercent?: number
) {
  return {
    symbol,
    name,
    quantity,
    avgPrice,
    marketCap: marketCap || 0,
    balance: balance || 0,
    price: price || 0,
    sevenDayChange: sevenDayChange || 0,
    thirtyDayChange: thirtyDayChange || 0,
    oneYearChange: oneYearChange || 0,
    todayChangePercent: todayChangePercent || 0,
  };
}

const portfolioData = [
  createPortfolioData('AAPL', 'Apple Inc.', 12, 195.0, '2.5T', 50000, 155.0, -2.5, 5.0, 15.0, 1.2),
  createPortfolioData('GOOGL', 'Alphabet Inc.', 5, 115.0, '1.8T', 75000, 118.0, 3.0, -1.5, 10.0, -0.5),
  createPortfolioData('AMZN', 'Amazon.com Inc.', 20, 150, '1.7T', 60000, 164.0, 8.0, 2.0, 25.0, 2.5),
  createPortfolioData('MSFT', 'Microsoft Corp.', 93, 345, '2.0T', 70000, 325.0, -1.0, 4.0, 18.0, -0.8),
  createPortfolioData('NFLX', 'Netflix Inc.', 84, 287, '12T', 45000, 0, 5.0, -3.0, 8.0, 1.0),
  createPortfolioData('TSLA', 'Tesla Inc.', 29, 1234, '0.4T', 0, 0, 2.0, 7.0, 30.0, 0.5),
];


const Portfolio: React.FC = () => {
  
  return (
    <Box sx={{ borderRadius: '16', padding: '0 10px', marginBottom: '10px' }}>
    <Paper elevation={1} variant="elevation" square={false} sx={{ display: 'flex', flexDirection: 'row',  backgroundColor: 'white' }}>
      <TableContainer component={Paper} sx={{}}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Average Price</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">7-Day Change</TableCell>
              <TableCell align="right">30-Day Change</TableCell>
              <TableCell align="right">1-Year Change</TableCell>
              <TableCell align="right">Today's Change Percent</TableCell>
            </TableRow>
            {portfolioData.map((row) => (
              <TableRow key={row.symbol} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ }}>{row.symbol}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.avgPrice}</TableCell>
                <TableCell align="right">{row.marketCap}</TableCell>
                <TableCell align="right">{row.balance}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right" sx={{ color: (row.sevenDayChange > 0 ? 'green' : 'red') }}>{row.sevenDayChange}</TableCell>
                <TableCell align="right" sx={{ color: row.thirtyDayChange > 0 ? 'green' : 'red' }}>{row.thirtyDayChange}</TableCell>
                <TableCell align="right" sx={{ color: row.oneYearChange > 0 ? 'green' : 'red' }}>{row.oneYearChange}</TableCell>
                <TableCell align="right" sx={{ color: row.todayChangePercent > 0 ? 'green' : 'red' }}>{row.todayChangePercent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </Box>
  );
};

export default Portfolio;
