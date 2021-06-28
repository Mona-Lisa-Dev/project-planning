import axios from 'axios';
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
} from './auth-actions';

axios.defaults.baseURL = 'http://localhost:5000/api';

const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

const signup = payload => async dispatch => {
  dispatch(signupRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/users/signup', payload);

    dispatch(signupSuccess(data));
    token.set(data.token);

    return data;
  } catch (error) {
    dispatch(signupError(error.message));
  }
};

const login = payload => async dispatch => {
  dispatch(loginRequest());

  try {
    const {
      data: { data },
    } = await axios.post('/users/login', payload);

    dispatch(loginSuccess(data));
    token.set(data.token);

    return data;
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

const logout = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    await axios.post(`/users/logout`);

    dispatch(logoutSuccess());
    token.unset();
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  signup,
  login,
  logout,
};
