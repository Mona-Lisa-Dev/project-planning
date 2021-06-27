import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import middleware from './middleware';

export const store = configureStore({
  reducer: {},
  middleware,
  // devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
