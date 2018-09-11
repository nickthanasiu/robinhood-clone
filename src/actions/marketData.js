/*eslint-disable*/
import axios from 'axios';
import {
  GET_INTRADAY_BEGIN,
  GET_INTRADAY_SUCCESS,
  GET_INTRADAY_ERROR,
  GET_LATEST_BEGIN,
  GET_LATEST_SUCCESS,
  GET_LATEST_ERROR,
  GET_DAILY_BEGIN,
  GET_DAILY_SUCCESS,
  GET_DAILY_ERROR,
} from './types';

const API_URL = 'http://localhost:3090/api';

const getIntradayBegin= () => ({
  type: 'GET_INTRADAY_BEGIN',
});

const getIntradaySuccess = data => ({
  type: 'GET_INTRADAY_SUCCESS',
  payload: { data },
});

const getIntradayError = error => ({
  type: 'GET_INTRADAY_ERROR',
  payload: { error },
});

export const getIntraday = symbol => async (dispatch) => {
  try {
    dispatch(getIntradayBegin());
    console.log('CALLING GETINTRADAY WITH: ', symbol);
    const response = await axios.post(`${API_URL}/intraday_data`, {
      query: symbol,
    });
    const responseArray = Object.entries(response.data);
    console.log('GETINTRADAY RESPONSE: ', responseArray);
  } catch (err) {
    console.log(err);
  }
};

const getDailyBegin = () => ({
  type: 'GET_DAILY_BEGIN',
});

const getDailySuccess = data => ({
  type: 'GET_DAILY_SUCCESS',
  payload: { data }
});

const getDailyError = error => ({
  type: 'GET_DAILY_ERROR',
  payload: { error }
});

export const getDaily = symbol => async (dispatch) => {
  try {
    dispatch(getDailyBegin());

    const response = await axios.post(`${API_URL}/daily_data`, {
      query: symbol
    });
    const responseArray = Object.entries(response.data);
    const mostRecent = responseArray[0][1];
    const lastClose = Object.entries(mostRecent)[3][1];
    console.log('GET DAILY DATA RESPONSE: ', lastClose);

  } catch (err) {
    console.log(err);
  }
};

const getLatestBegin = () => ({
  type: 'GET_CURRENT_BEGIN',
});

const getLatestSuccess = data => ({
  type: 'GET_CURRENT_SUCCESS',
  payload: { data }
});

const getLatestError = error => ({
  type: 'GET_CURRENT_ERROR',
  payload: { error }
});

export const getLatestPrice = symbol => async (dispatch) => {
  try {
    dispatch(getLatestBegin());

    const response = await axios.post(`${API_URL}/latest_price`, { symbol });

    console.log('GETLATESTPRICE RESPONSE: ', response.data);
    // dispatch(getLatestSuccess(lastClose));
  } catch (err) {
    dispatch(getLatestError(err));
  }
};
