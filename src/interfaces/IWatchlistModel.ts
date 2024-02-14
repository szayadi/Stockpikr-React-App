import { IStockQuote } from './IStockQuote';

export interface IWatchlistModel {
  watchlistName: string; // if we want to fix this, we need to change the field in the backend as well
  userID: string;
  tickers: WatchlistTicker[];
}

export type MinimalWatchlistTicker = {
  symbol: string;
  alertPrice: number;
};

export type WatchlistTicker = MinimalWatchlistTicker & IStockQuote;

export type Watchlists = { [key: string]: WatchlistTicker[] };
