import { configureStore } from '@reduxjs/toolkit';
import watchlistSlice from './slices/watchlistSlice';

export const store = configureStore({
  reducer: {
    watchlists: watchlistSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
