import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface StockData {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  balance: number;
  price: number;
  changesPercentage: number;
  thirtyDayChange: number;
  oneYearChange: number;
  todayChangePercent: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  open: number;
  previousClose: number;
}

function createPortfolioDataFromJson(symbol: string, entry: any): StockData {
  return {
    symbol: entry.symbol || symbol,
    name: entry.name || '',
    quantity: entry.quantity || 0,
    avgPrice: entry.avgPrice || 0,
    marketCap: entry.marketCap || 0,
    balance: entry.balance || 0,
    price: entry.price || 0,
    changesPercentage: entry.changesPercentage || 0,
    thirtyDayChange: entry.thirtyDayChange || 0,
    oneYearChange: entry.oneYearChange || 0,
    todayChangePercent: entry.todayChangePercent || 0,
    dayLow: entry.dayLow || 0,
    dayHigh: entry.dayHigh || 0,
    yearHigh: entry.yearHigh || 0,
    yearLow: entry.yearLow || 0,
    open: entry.open || 0,
    previousClose: entry.previousClose || 0,
  };
}

const Portfolio: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = require('../../../assets/mock_data.json');

        const stockData : StockData[] = json.stocks || [];
        console.log('Stocks:', stockData);

        const stockEntries = stockData.map((stock: StockData) => {
          return createPortfolioDataFromJson(stock.symbol, stock);
        });
        
        setPortfolioData(stockEntries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ borderRadius: '16', padding: '0 10px', marginBottom: '10px' }}>
      <Paper elevation={1} variant="elevation" square={false} sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
        <TableContainer component={Paper} sx={{}}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Changes Percentage</TableCell>
                <TableCell align="right">30-Day Change</TableCell>
                <TableCell align="right">1-Year Change</TableCell>
                <TableCell align="right">Today's Change Percent</TableCell>
                <TableCell align="right">Day Low</TableCell>
                <TableCell align="right">Day High</TableCell>
                <TableCell align="right">Year High</TableCell>
                <TableCell align="right">Year Low</TableCell>
                <TableCell align="right">Previous Close</TableCell>
                {/* Add other table header cells here */}
              </TableRow>
              {portfolioData.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ }}>{row.symbol}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.changesPercentage}</TableCell>
                  <TableCell align="right">{row.thirtyDayChange}</TableCell>
                  <TableCell align="right">{row.oneYearChange}</TableCell>
                  <TableCell align="right">{row.todayChangePercent}</TableCell>
                  <TableCell align="right">{row.dayLow}</TableCell>
                  <TableCell align="right">{row.dayHigh}</TableCell>
                  <TableCell align="right">{row.yearHigh}</TableCell>
                  <TableCell align="right">{row.yearLow}</TableCell>
                  <TableCell align="right">{row.previousClose}</TableCell>
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
