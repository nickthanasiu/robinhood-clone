/*eslint-disable*/
import axios from 'axios';

import {
  GET_PORTFOLIO_BEGIN,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_ERROR,
  GET_PORTFOLIO_INTRA_BEGIN,
  GET_PORTFOLIO_INTRA_SUCCESS,
  GET_PORTFOLIO_INTRA_ERROR,
} from './types';

const API_URL = 'http://localhost:3090/api';

const getPortfolioBegin = () => ({
  type: GET_PORTFOLIO_BEGIN
});

const getPortfolioSuccess = value => ({
  type: GET_PORTFOLIO_SUCCESS,
  payload: { value }
});

const getPortfolioError = error => ({
  type: GET_PORTFOLIO_ERROR,
  payload: { error }
});

export const getPortfolioValue = currentUserId => async dispatch => {
  try {
    dispatch(getPortfolioBegin());

    const response = await axios.post(`${API_URL}/portfolio_value`, { currentUserId });
    const value = response.data;
    dispatch(getPortfolioSuccess(value));

  } catch (err) {
    dispatch(getPortfolioError(err));
  }
};

const getPortfolioIntraBegin = () => ({
  type: GET_PORTFOLIO_INTRA_BEGIN
});

const getPortfolioIntraSuccess = data => ({
  type: GET_PORTFOLIO_INTRA_SUCCESS,
  payload: { data }
});

const getPortfolioIntraError = error => ({
  type: GET_PORTFOLIO_INTRA_ERROR,
  payload: { error }
});

export const getPortfolioIntraday = symbols => async dispatch => {
  console.log('FIRING GETPORTFOLIOITRADAY ACTION WITH SYMBOLS: ', symbols);
  try {
    dispatch(getPortfolioIntraBegin());

    const response = await axios.post(`${API_URL}/portfolio_intraday`, { symbols });
    dispatch(getPortfolioIntraSuccess(response.data));
    
  } catch (err) {
    dispatch(getPortfolioIntraError(err));
  }
};
