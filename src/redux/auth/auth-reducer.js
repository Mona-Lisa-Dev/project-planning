import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  signupRequest,
  signupSuccess,
  signupError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  clearError,
} from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [signupSuccess]: (_, { payload }) => payload,
  [loginSuccess]: (_, { payload }) => payload,
  [logoutSuccess]: () => initialUserState,
  [logoutError]: () => initialUserState,
});

const token = createReducer(null, {
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

const isAuthorized = createReducer(false, {
  [loginSuccess]: () => true,

  [signupError]: () => false,
  [loginError]: () => false,
  [logoutRequest]: () => false,
});

const isLoading = createReducer(false, {
  [signupRequest]: () => true,
  [signupSuccess]: () => false,
  [signupError]: () => false,

  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [loginError]: () => false,

  [logoutRequest]: () => true,
  [logoutSuccess]: () => false,
  [logoutError]: () => false,
});

const setError = (_, { payload }) => payload;

const errorSignup = createReducer(null, {
  [signupError]: setError,
  [signupRequest]: () => null,
  [clearError]: () => null,
});

const errorLogin = createReducer(null, {
  [loginError]: setError,
  [loginRequest]: () => null,
  [clearError]: () => null,
});

const error = createReducer(null, {
  [logoutError]: setError,
  [logoutRequest]: () => null,
});

export default combineReducers({
  user,
  token,
  isAuthorized,
  isLoading,
  error,
  errorSignup,
  errorLogin,
});
