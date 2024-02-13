export interface IWatchlistModel {
  watchlistName: string; // if we want to fix this, we need to change the field in the backend as well
  userID: string;
  tickers: WatchlistTicker[];
}

export interface WatchlistTicker {
  symbol: string; // should be unique
  name: string;
  exchange: string;
  alertPrice: number;
  currentPrice: number;
  nearHigh: number;
  highest: number;
}

export type Watchlists = { [key: string]: WatchlistTicker[] };