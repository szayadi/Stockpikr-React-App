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
import { createPortfolioDataFromJson } from '../../Helper';
import { StockData } from '../../interfaces/StockDataInterface';

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
