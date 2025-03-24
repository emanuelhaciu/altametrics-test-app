import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
export const store = configureStore({
    reducer: rootReducer, // Using rootReducer instead of individual reducers
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;