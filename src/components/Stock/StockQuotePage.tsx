import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { SymbolInfo, TechnicalAnalysis } from 'react-ts-tradingview-widgets';
import { getErrorResponse } from '../../helper/errorResponse';
import { ICompanyProfile } from '../../interfaces/ICompanyProfile';
import { IStockQuote } from '../../interfaces/IStockQuote';
import { StockApiService } from '../../services/StockApiService';
import { useAsyncError } from '../GlobalErrorBoundary';
import CompanyOverviewCard from './Components/CompanyOverviewCard';
import StockCard from './Components/StockCard';
import TradingViewChart from './Components/TradingViewChart';

export const StockQuotePage: React.FC = () => {
  const [quote, setQuote] = useState<IStockQuote | null>(null);
  const [companyProfile, setCompanyProfile] = useState<ICompanyProfile | null>(null);
  const throwError = useAsyncError();

  useEffect(() => {
    const url = window.location.href;
    const hashIndex = url.indexOf('#');
    const hash = hashIndex !== -1 ? url.slice(hashIndex + 1) : '';
    const searchParams = new URLSearchParams(hash);
    const symbolParam = searchParams.get('/quote?symbol');
    if (symbolParam == null) {
      return;
    }
    const fetchQuoteData = async () => {
      await StockApiService.fetchStockQuote([symbolParam]).then((response): void => {
        if (response == null) {
          return;
        }
        const stock = response[0] || response || null;
        setQuote(stock);
      });
    };

    const fetchCompanyProfile = async () => {
      await StockApiService.fetchCompanyProfile(symbolParam).then((response): void => {
        if (response == null) {
          return;
        }
        const company = response[0] || null;
        setCompanyProfile(company);
      });
    };
    fetchQuoteData().catch((error) => {
      throwError(error);
    });
    fetchCompanyProfile().catch((error) => {
      throwError(error);
    });
  }, []);

  const handleAddToWatchlist = () => {
    //console.log('Added to watchlist');
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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

  if (!quote || !companyProfile) {
    return <div></div>;
  }

  return (
    <Box sx={{ flexGrow: 1, margin: '20px' }}>
      <Grid container spacing={2}>
        <Grid xs={12} display="flex" justifyContent="right" alignItems="right">
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
        <Grid xs={4}>
          <Item elevation={0}>
            <SymbolInfo symbol={quote.symbol} colorTheme="dark" autosize></SymbolInfo>
            <StockCard stock={quote} />
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item elevation={0}>
            <TradingViewChart symbol={quote.symbol || ''} />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item elevation={0}>
            <CompanyOverviewCard companyProfile={companyProfile} />
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item elevation={0}>
            <TechnicalAnalysis symbol={quote.symbol || ''} colorTheme="dark" width="100%"></TechnicalAnalysis>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
