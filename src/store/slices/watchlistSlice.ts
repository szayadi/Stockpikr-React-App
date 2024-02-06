import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStockQuote } from '../../interfaces/IStockQuote';

interface WatchlistSliceState {
  value: IStockQuote[];
}
const initialState: WatchlistSliceState = {
  value: []
};

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addStock: (state, action: PayloadAction<IStockQuote>) => {
      state.value = [...state.value, action.payload];
    }
  }
});

export const { addStock } = watchlistSlice.actions;

export default watchlistSlice.reducer;
