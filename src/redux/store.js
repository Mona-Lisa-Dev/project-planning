import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import middleware from './middleware';
import auth from './auth/auth-reducer';

export const store = configureStore({
  reducer: {
    auth,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
