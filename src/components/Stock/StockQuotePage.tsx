import { CheckCircle } from '@mui/icons-material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FundamentalData, SymbolInfo, TechnicalAnalysis } from 'react-ts-tradingview-widgets';
import { userID } from '../../helper/constants';
import { getErrorResponse } from '../../helper/errorResponse';
import { ICompanyProfile } from '../../interfaces/ICompanyProfile';
import { IStockQuote } from '../../interfaces/IStockQuote';
import { Watchlists } from '../../interfaces/IWatchlistModel';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import { useAsyncError } from '../GlobalErrorBoundary';
import AddStockDialog from '../Watchlist/AddStockDialog';
import TradingViewChart from './Components/TradingViewChart';

export const StockQuotePage: React.FC = () => {
  const [symbolParam, setSymbolParam] = useState<string | null>(null);
  const [quote, setQuote] = useState<IStockQuote | null>(null);
  const [companyProfile, setCompanyProfile] = useState<ICompanyProfile | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isAddStockDialog, setAddStockDialog] = useState(false);
  const [watchlists, setWatchlists] = useState<Watchlists>();
  const location = useLocation();
  const throwError = useAsyncError();

  useEffect(() => {
    const url = window.location.href;
    const hashIndex = url.indexOf('#');
    const hash = hashIndex !== -1 ? url.slice(hashIndex + 1) : '';
    const searchParams = new URLSearchParams(hash);
    setSymbolParam(searchParams.get('/quote?symbol'));
    queryWatchLists().catch((error) => {
      // throwError(error);
    });

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
  }, [location]);

  const queryWatchLists = async () => {
    const wls = await WatchlistApiService.fetchWatchlistsByUserId(userID);
    if (Array.isArray(wls)) {
      let tempWls: Watchlists = {};
      wls.forEach((wl, i) => {
        if (!tempWls[wl.watchlistName]) {
          tempWls[wl.watchlistName] = [];
        }
        tempWls[wl.watchlistName] = wl.tickers;
        if (wl.tickers.some((ticker) => ticker.symbol === symbolParam)) {
          setIsInWatchlist(true);
        }
      });
      setWatchlists(tempWls);
    }
  };

  const handleAddToWatchlist = () => {
    setAddStockDialog(true);
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

  if (!symbolParam) {
    return <div></div>;
  }

  return (
    <Box sx={{ flexGrow: 1, margin: '20px' }}>
      <AddStockDialog
        addStockSymbol={symbolParam}
        watchlists={watchlists}
        setWatchlists={setWatchlists}
        isAddStockDialog={isAddStockDialog}
        setAddStockDialog={setAddStockDialog}
      />
      <Grid container spacing={2}>
        <Grid xs={12} display="flex" justifyContent="right" alignItems="right">
          <Item elevation={0}>
            <Button
              sx={{ backgroundColor: isInWatchlist ? 'var(--secondary-button-bg-color)' : 'var(--navbar-bg-color)' }}
              component="label"
              variant="contained"
              onClick={handleAddToWatchlist}
              size="large"
              startIcon={isInWatchlist ? <CheckCircle /> : <AddCircleOutlineOutlinedIcon />}
            >
              {isInWatchlist ? 'Added' : 'Add To Watchlist'}
            </Button>{' '}
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item elevation={0}>
            <SymbolInfo symbol={symbolParam} autosize></SymbolInfo>
            <FundamentalData symbol={symbolParam} height={760} width="100%"></FundamentalData>
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item elevation={0}>
            <TradingViewChart symbol={symbolParam || ''} />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item elevation={0}>
            <TechnicalAnalysis symbol={symbolParam || ''} width="100%"></TechnicalAnalysis>
          </Item>
        </Grid>
        <Grid xs={8}>
          <Item elevation={0}>
            <div style={{ backgroundColor: 'lightgray', height: 400 }}>PlaceHolder</div>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
