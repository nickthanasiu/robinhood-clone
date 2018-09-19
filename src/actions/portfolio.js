/*eslint-disable*/
import axios from 'axios';

import {
  GET_PORTFOLIO_BEGIN,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_ERROR,
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

    console.log('PORTFOLIO VALUE RESPONSE: ', response);
  } catch (err) {
    dispatch(getPortfolioError(err));
  }
};
