export interface IWatchlistModel {
  name: string;
  userID: string;
  tickers: Ticker[];
}

export interface Ticker {
  symbol: string; // should be unique
  alertPrice: number;
  name?: string;
}
