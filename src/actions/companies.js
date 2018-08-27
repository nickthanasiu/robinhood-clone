/*eslint-disable*/

import axios from 'axios';
import {
  COMPANY_SEARCH_BEGIN,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_ERROR,
  FETCH_FOLLOWED_COMPANIES_BEGIN,
  FETCH_FOLLOWED_COMPANIES_SUCCESS,
  FETCH_FOLLOWED_COMPANIES_ERROR
} from './types';

const API_URL = 'http://localhost:3090';

export const searchCompanies = (query, callback) => async dispatch => {
  try {
    console.log('Searching Companies for: ', query);
    dispatch({
      type: COMPANY_SEARCH_BEGIN
    });

    const response = await axios.post(`${API_URL}/api/search_companies/`, {
      name: query,
      symbol: query
    });
    console.log('RESPONSE: ', response.data[0]);
    dispatch({
      type: COMPANY_SEARCH_SUCCESS,
      payload: response.data[0]
    });

    callback();
  } catch (err) {
    console.log('CAUGHT ERROR: ', err);
  }
};

export const followCompany = (currentUserId, companyId) => async dispatch => {
  try {
    console.log('CALLING FOLLOW COMPANY ACTION WITH USERID: ', currentUserId, ' AND COMPANYID: ', companyId);
    const response = await axios.post(`${API_URL}/api/follow_company/`, {
      currentUserId,
      companyId
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const getFollowedCompanies = (currentUserId) => async dispatch => {
  try {
    dispatch({
      type: FETCH_FOLLOWED_COMPANIES_BEGIN
    });

    const response = await axios.post(`${API_URL}/api/get_followed_companies`, { currentUserId });
    dispatch({
      type: FETCH_FOLLOWED_COMPANIES_SUCCESS,
      payload: response.data
    });

  } catch (err) {
    dispatch({
      type: FETCH_FOLLOWED_COMPANIES_ERROR,
      payload: 'Error: there was a problem retrieving user\'s followed companies'
    });
  }
 };
