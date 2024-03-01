import { IStockQuote } from './IStockQuote';

export interface IPositionsModel {
    userID: string;
    tickers: PositionTickers[];
}

export type MinimalPositionsTicker = {
    symbol: string;
    purchasePrice: number;
    quantity: number;
    purchaseDate: Date | null;
    price: number;
    priceChange: number;
    gainOrLoss: number;
    marketValue: number;
};

export type PositionTickers = IStockQuote & MinimalPositionsTicker;

export type Positions = { [key: string]: PositionTickers[] };
