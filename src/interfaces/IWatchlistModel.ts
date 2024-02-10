export interface IWatchlistModel {
  watchlistName: string;
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