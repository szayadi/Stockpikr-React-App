import { Grid, Paper, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IStockQuote } from '../../interfaces/IStockQuote';
import { StockApiService } from '../../services/StockApiService';
import StockDataTable from './StockQuoteDataTable';

const Dashboard: React.FC = () => {
  const [stockData, setStockData] = useState<IStockQuote[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      // Place holder symbols
      const blueChipSymbols: string[] = ['AAPL', 'MSFT', 'AMZN', 'GOOGL', 'JNJ', 'PG', 'KO', 'JPM', 'DIS', 'INTC'];
      StockApiService.fetchStockQuotes(blueChipSymbols).then((response) => {
        if (response == null) {
          return;
        }
        setStockData(response);
      });
    };

    fetchData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', //change to #fff later
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  return (
    <Grid container>
      <Grid xs={12}>
        <Item elevation={0}>
          <Typography variant="h4" sx={{ color: 'black', margin: '20px 0px' }}>
            Portfolio
          </Typography>{' '}
        </Item>
      </Grid>
      <Grid xs={8}>
        <Item elevation={0}>
          <StockDataTable data={stockData} />
        </Item>
      </Grid>
      <Grid xs={4}>
        <Item elevation={0}>
          <div style={{ backgroundColor: 'lightgray', height: 400 }}>PlaceHolder</div>
        </Item>
      </Grid>
      <Grid xs={4}>
        <Item elevation={0}>
          <div style={{ backgroundColor: 'lightgray', height: 400 }}>PlaceHolder</div>
        </Item>
      </Grid>
      <Grid xs={8}>
        <Item elevation={0}>
          <div style={{ backgroundColor: 'lightgray', height: 400 }}>PlaceHolder</div>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
