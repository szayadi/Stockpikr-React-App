import { StockData } from './interfaces/IStockData';

export function createPortfolioDataFromJson(symbol: string, entry: any): StockData {
  return {
    symbol: entry.symbol || symbol,
    name: entry.name || '',
    quantity: entry.quantity || 0,
    avgPrice: entry.avgPrice || 0,
    marketCap: entry.marketCap || 0,
    balance: entry.balance || 0,
    price: entry.price || 0,
    changesPercentage: entry.changesPercentage || 0,
    thirtyDayChange: entry.thirtyDayChange || 0,
    oneYearChange: entry.oneYearChange || 0,
    todayChangePercent: entry.todayChangePercent || 0,
    dayLow: entry.dayLow || 0,
    dayHigh: entry.dayHigh || 0,
    yearHigh: entry.yearHigh || 0,
    yearLow: entry.yearLow || 0,
    open: entry.open || 0,
    previousClose: entry.previousClose || 0
  };
}
