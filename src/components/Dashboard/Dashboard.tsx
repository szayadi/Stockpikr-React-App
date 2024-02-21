import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TickerTape, Timeline } from 'react-ts-tradingview-widgets';
import { IStockPriceChange } from '../../interfaces/IStockPriceChange';
import { IStockQuote } from '../../interfaces/IStockQuote';
import { StockApiService } from '../../services/StockApiService';
import { useAsyncError } from '../GlobalErrorBoundary';
import StockPriceChangeDataTable from './StockChangeDataTable';
import StockDataTable from './StockQuoteDataTable';

const Dashboard: React.FC = () => {
  const [stockQuote, setStockData] = useState<IStockQuote[]>([]);
  const [gainers, setGainers] = useState<IStockPriceChange[]>([]);
  const [actives, setActives] = useState<IStockPriceChange[]>([]);
  const [losers, setLosers] = useState<IStockPriceChange[]>([]);
  const throwError = useAsyncError();

  useEffect(() => {
    const fetchDataTable = async (): Promise<void> => {
      const blueChipSymbols: string[] = ['AAPL', 'MSFT', 'AMZN', 'GOOGL', 'JNJ', 'PG', 'KO', 'JPM', 'DIS', 'INTC']; // Place holder symbols
      StockApiService.fetchLatestStockQuote(blueChipSymbols).then((response) => {
        if (response.length === 0) {
          return;
        }
        setStockData(response);
      });
    };

    fetchDataTable().catch((error) => {
      throwError(error);
    });

    const fetchGainers = async (): Promise<void> => {
      StockApiService.fetchMarketGainers().then((response) => {
        if (response.length === 0) {
          return;
        }
        setGainers(response);
      });
    };
    fetchGainers().catch((error) => {
      throwError(error);
    });
    const fetchLosers = async (): Promise<void> => {
      StockApiService.fetchMarketLosers().then((response) => {
        if (response.length === 0) {
          return;
        }
        setLosers(response);
      });
    };
    fetchLosers().catch((error) => {
      throwError(error);
    });
    const fetchActives = async (): Promise<void> => {
      StockApiService.fetchMarketActives().then((response) => {
        if (response.length === 0) {
          return;
        }
        setActives(response);
      });
    };
    fetchActives().catch((error) => {
      throwError(error);
    });
  }, []);

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary
  // }));

  return (
    <Grid container sx={{ marginTop: '50px' }}>
      <Grid item xs={12}>
        <TickerTape></TickerTape>
      </Grid>
      <Grid item xs={8}>
        <StockDataTable data={stockQuote} />
      </Grid>
      <Grid item xs={4}>
        <Timeline feedMode="market" market="stock" height="1000" width="100%"></Timeline>
      </Grid>
      <Grid item xs={4}>
        <StockPriceChangeDataTable data={gainers} title="Market Most Gainers"></StockPriceChangeDataTable>
      </Grid>
      <Grid item xs={4}>
        <StockPriceChangeDataTable data={losers} title="Market Most Losers"></StockPriceChangeDataTable>
      </Grid>
      <Grid item xs={4}>
        <StockPriceChangeDataTable data={actives} title="Market Most Actives"></StockPriceChangeDataTable>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
