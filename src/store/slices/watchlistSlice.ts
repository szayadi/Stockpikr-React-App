import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWatchlistModel } from '../../interfaces/IWatchlistModel';

interface WatchlistSliceState {
  value: IWatchlistModel[];
}
const initialState: WatchlistSliceState = {
  value: []
};

export const watchlistSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    setWatchlistsRedux: (state, action: PayloadAction<IWatchlistModel[]>) => {
      state.value = action.payload;
    },
    addWatchlistRedux: (state, action: PayloadAction<IWatchlistModel>) => {
      const existingWL = state.value.find((s) => s.watchlistName === action.payload.watchlistName);

      if (existingWL !== undefined) {
        existingWL.tickers = [...existingWL.tickers, ...action.payload.tickers];
      } else {
        state.value = [...state.value, action.payload];
      }
    },
    deleteWatchlistRedux: (state, action: PayloadAction<IWatchlistModel>) => {
      state.value.map((s) => s != action.payload);
    }
  }
});

export const { setWatchlistsRedux, addWatchlistRedux, deleteWatchlistRedux } = watchlistSlice.actions;

export default watchlistSlice.reducer;
