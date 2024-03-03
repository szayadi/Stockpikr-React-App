import { CheckCircle } from '@mui/icons-material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, ToggleButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FundamentalData, MiniChart, SymbolInfo, TechnicalAnalysis, Timeline } from 'react-ts-tradingview-widgets';
import { userID } from '../../helper/constants';
import { getErrorResponse } from '../../helper/errorResponse';
import { ICompanyProfile } from '../../interfaces/ICompanyProfile';
import { IStockQuote } from '../../interfaces/IStockQuote';
import { Watchlists } from '../../interfaces/IWatchlistModel';
import { WatchlistApiService } from '../../services/WatchlistApiService';
import { useAsyncError } from '../GlobalErrorBoundary';
import AddStockDialog from '../Watchlist/AddStockDialog';
import TradingViewChart from './Components/TradingViewChart';

interface StockQuotePageStates {
  isInWatchList: boolean;
  watchlists: Watchlists;
  symbolParam: string | null;
}

var initialState: StockQuotePageStates = {
  isInWatchList: false,
  watchlists: {},
  symbolParam: null
};

export const StockQuotePage: React.FC = () => {
  const [colorTheme, setColorTheme] = useState<'light' | 'dark'>('light');
  const [quote, setQuote] = useState<IStockQuote | null>(null);
  const [companyProfile, setCompanyProfile] = useState<ICompanyProfile | null>(null);
  const [isAddStockDialog, setAddStockDialog] = useState(false);
  const [state, setState] = useState<StockQuotePageStates>(initialState);
  const location = useLocation();
  const throwError = useAsyncError();

  useEffect(() => {
    const url = window.location.href;
    const hashIndex = url.indexOf('#');
    const hash = hashIndex !== -1 ? url.slice(hashIndex + 1) : '';
    const searchParams = new URLSearchParams(hash);
    const symbolParam = searchParams.get('/quote?symbol');
    queryWatchLists(symbolParam).catch((error) => {
      // throwError(error);
    });

    if (!state.symbolParam) {
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

  const queryWatchLists = async (symbolParam: string | null) => {
    const wls = await WatchlistApiService.fetchWatchlistsByUserId(userID);
    var inWatchList = false;
    if (Array.isArray(wls)) {
      let tempWls: Watchlists = {};
      wls.forEach((wl, i) => {
        if (!tempWls[wl.watchlistName]) {
          tempWls[wl.watchlistName] = [];
        }
        tempWls[wl.watchlistName] = wl.tickers;
        if (wl.tickers.some((ticker) => ticker.symbol.toUpperCase() === symbolParam?.toUpperCase())) {
          inWatchList = true;
        }
      });
      setState({ isInWatchList: inWatchList, watchlists: tempWls, symbolParam: symbolParam });
    }
  };

  const handleAddToWatchlist = () => {
    setAddStockDialog(true);
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

  if (!state.symbolParam) {
    return <div></div>;
  }

  return (
    <div style={{ backgroundColor: colorTheme === 'dark' ? '#333' : 'white' }}>
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <AddStockDialog
          addStockSymbol={state.symbolParam}
          watchlists={state.watchlists}
          setWatchlists={(wl) => {
            var keys = Object.keys(wl);
            setState({
              ...state,
              watchlists: wl,
              isInWatchList: keys.some((key) =>
                wl[key].some((ti) => ti.symbol.toUpperCase() === state.symbolParam?.toUpperCase())
              )
            });
          }}
          isAddStockDialog={isAddStockDialog}
          setAddStockDialog={setAddStockDialog}
        />
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
                sx={{
                  backgroundColor: state.isInWatchList ? 'var(--secondary-button-bg-color)' : 'var(--navbar-bg-color)'
                }}
                component="label"
                variant="contained"
                onClick={handleAddToWatchlist}
                size="large"
                startIcon={state.isInWatchList ? <CheckCircle /> : <AddCircleOutlineOutlinedIcon />}
              >
                {state.isInWatchList ? 'Added' : 'Add To Watchlist'}
              </Button>{' '}
            </Item>
          </Grid>
          <Grid xs={7}>
            <Item elevation={0}>
              <SymbolInfo symbol={state.symbolParam} colorTheme={colorTheme} autosize></SymbolInfo>
              <MiniChart colorTheme={colorTheme} width="100%" symbol={state.symbolParam} autosize></MiniChart>
            </Item>
          </Grid>
          <Grid xs={5}>
            <Item elevation={0}>
              <TechnicalAnalysis
                colorTheme={colorTheme}
                symbol={state.symbolParam || ''}
                width="100%"
              ></TechnicalAnalysis>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item elevation={0}>
              <TradingViewChart theme={colorTheme} symbol={state.symbolParam || ''} />
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item elevation={0}>
              <FundamentalData
                colorTheme={colorTheme}
                symbol={state.symbolParam}
                height={760}
                width="100%"
              ></FundamentalData>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Timeline
              colorTheme={colorTheme}
              feedMode="symbol"
              symbol={state.symbolParam}
              height={760}
              width="100%"
            ></Timeline>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
