import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, ToggleButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { FundamentalData, MiniChart, SymbolInfo, TechnicalAnalysis, Timeline } from 'react-ts-tradingview-widgets';
import { getErrorResponse } from '../../helper/errorResponse';
import { ICompanyProfile } from '../../interfaces/ICompanyProfile';
import { IStockQuote } from '../../interfaces/IStockQuote';
import { useAsyncError } from '../GlobalErrorBoundary';
import TradingViewChart from './Components/TradingViewChart';

export const StockQuotePage: React.FC = () => {
  const [symbolParam, setSymbolParam] = useState<string | null>(null);
  const [colorTheme, setColorTheme] = useState<'light' | 'dark'>('light');
  const [quote, setQuote] = useState<IStockQuote | null>(null);
  const [companyProfile, setCompanyProfile] = useState<ICompanyProfile | null>(null);
  const throwError = useAsyncError();

  useEffect(() => {
    const url = window.location.href;
    const hashIndex = url.indexOf('#');
    const hash = hashIndex !== -1 ? url.slice(hashIndex + 1) : '';
    const searchParams = new URLSearchParams(hash);
    setSymbolParam(searchParams.get('/quote?symbol'));
    if (!symbolParam) {
      return;
    }
    //might need later

    // const fetchQuoteData = async () => {
    //   await StockApiService.fetchLatestStockQuote([symbolParam]).then((response): void => {
    //     if (!response) {
    //       return;
    //     }
    //     const stock = response[0] || response || null;
    //     setQuote(stock);
    //   });
    // };

    // const fetchCompanyProfile = async () => {
    //   StockApiService.fetchCompanyProfile(symbolParam).then((response): void => {
    //     if (!response) {
    //       return;
    //     }
    //     const company = response[0] || null;
    //     setCompanyProfile(company);
    //   });
    // };
    // fetchQuoteData().catch((error) => {
    //   throwError(error);
    // });
    // fetchCompanyProfile().catch((error) => {
    //   throwError(error);
    // });
  }, []);

  const handleAddToWatchlist = () => {
    //console.log('Added to watchlist');
  };

  const toggleTheme = () => {
    setColorTheme(colorTheme === 'light' ? 'dark' : 'light');
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: colorTheme === 'dark' ? '#333' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  const errorResponse = getErrorResponse(quote || null) || getErrorResponse(companyProfile || null);
  if (errorResponse) {
    return (
      <Typography variant="h6" sx={{ margin: '300px', color: 'black' }}>
        Error: {errorResponse}
      </Typography>
    );
  }

  if (!symbolParam) {
    return <div></div>;
  }

  return (
    <div style={{ backgroundColor: colorTheme === 'dark' ? '#333' : 'white' }}>
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid xs={6} display="flex" justifyContent="left" alignItems="left">
            <Item elevation={0}>
              <ToggleButton
                value="check"
                selected={colorTheme === 'dark'}
                onChange={toggleTheme}
                color={colorTheme === 'dark' ? 'primary' : 'secondary'}
              >
                Toggle Theme
              </ToggleButton>
            </Item>
          </Grid>
          <Grid xs={6} display="flex" justifyContent="right" alignItems="right">
            <Item elevation={0}>
              <Button
                sx={{ backgroundColor: 'var(--navbar-bg-color)' }}
                component="label"
                variant="contained"
                onClick={handleAddToWatchlist}
                size="large"
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                Add To Watchlist
              </Button>{' '}
            </Item>
          </Grid>
          <Grid xs={7}>
            <Item elevation={0}>
              <SymbolInfo symbol={symbolParam} colorTheme={colorTheme} autosize></SymbolInfo>
              <MiniChart colorTheme={colorTheme} width="100%" symbol={symbolParam} autosize></MiniChart>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item elevation={0}>
              <TechnicalAnalysis colorTheme={colorTheme} symbol={symbolParam || ''} width="100%"></TechnicalAnalysis>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item elevation={0}>
              <TradingViewChart theme={colorTheme} symbol={symbolParam || ''} />
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item elevation={0}>
              <FundamentalData colorTheme={colorTheme} symbol={symbolParam} height={760} width="100%"></FundamentalData>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Timeline
              colorTheme={colorTheme}
              feedMode="symbol"
              symbol={symbolParam}
              height={760}
              width="100%"
            ></Timeline>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
