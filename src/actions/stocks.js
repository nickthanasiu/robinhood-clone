/*eslint-disable*/

import axios from 'axios';
import {
  FETCH_STOCKS_BEGIN,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_ERROR,
} from './types';

const API_URL = 'http://localhost:3090/api';

const fetchStocksBegin = () => ({
  type: FETCH_STOCKS_BEGIN
});

const fetchStocksSuccess = stocks => ({
  type: FETCH_STOCKS_SUCCESS,
  payload: { stocks }
});

const fetchStocksError = error => ({
  type: FETCH_STOCKS_ERROR,
  payload: { error }
});

export const getMyStocks = currentUserId => async dispatch => {
  try {
    dispatch(fetchStocksBegin());

    const response = await axios.post(`${API_URL}/get_stocks`, { currentUserId });
    // const stocks = response.data???
    dispatch(fetchStocksSuccess(stocks));
  } catch (err) {
    dispatch(fetchStocksError());
  }
};
