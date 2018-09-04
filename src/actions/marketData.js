/*eslint-disable*/
import axios from 'axios';
import {
  GET_INTRADAY_BEGIN,
  GET_INTRADAY_SUCCESS,
  GET_INTRADAY_ERROR,
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
    console.log('GETINTRADAY RESPONSE: ', responseArray[0]);
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
    console.log('GET DAILY DATA RESPONSE: ', response);

  } catch (err) {
    console.log(err);
  }
};
