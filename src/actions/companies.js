/*eslint-disable*/

import axios from 'axios';
import {
  COMPANY_SEARCH_BEGIN,
  COMPANY_SEARCH_SUCCESS,
  COMPANY_SEARCH_ERROR,
  FETCH_COMPANIES_BEGIN,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_ERROR,
  FETCH_FOLLOWED_COMPANIES_BEGIN,
  FETCH_FOLLOWED_COMPANIES_SUCCESS,
  FETCH_FOLLOWED_COMPANIES_ERROR
} from './types';

const API_URL = 'http://localhost:3090/api';

export const searchCompanies = (query, callback) => async dispatch => {
  try {
    dispatch({
      type: COMPANY_SEARCH_BEGIN
    });

    const response = await axios.post(`${API_URL}/search_companies/`, {
      name: query,
      symbol: query
    });
    
    dispatch({
      type: COMPANY_SEARCH_SUCCESS,
      payload: response.data[0]
    });

    callback();
  } catch (err) {
    console.log('CAUGHT ERROR: ', err);
  }
};

const getCompaniesBegin = () => ({
  type: FETCH_COMPANIES_BEGIN,
});

const getCompaniesSuccess = companies => ({
  type: FETCH_COMPANIES_SUCCESS,
  payload: { companies },
});

const getCompaniesError = error => ({
  type: FETCH_COMPANIES_ERROR,
  payload: { error },
});

export const getCompanies = () => async dispatch => {
  try {
    dispatch(getCompaniesBegin());

    const response = await axios.get(`${API_URL}/get_companies`);
    dispatch(getCompaniesSuccess(response.data));

  } catch (err) {
    console.log('CAUGHT ERROR: ', err);
    dispatch(getCompaniesError(err));
  }
};

export const followCompany = (currentUserId, companyId) => async dispatch => {
  try {
    console.log('CALLING FOLLOW COMPANY ACTION WITH USERID: ', currentUserId, ' AND COMPANYID: ', companyId);
    const response = await axios.post(`${API_URL}/follow_company/`, {
      currentUserId,
      companyId
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const unfollowCompany = (currentUserId, companyId) => async dispatch => {
  try {
    console.log('UNFOLLOWING COMPANY');
    await axios.post(`${API_URL}/unfollow_company`, {
      currentUserId,
      companyId
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFollowedCompanies = (currentUserId) => async dispatch => {
  try {
    dispatch({
      type: FETCH_FOLLOWED_COMPANIES_BEGIN
    });

    const response = await axios.post(`${API_URL}/get_followed_companies`, { currentUserId });
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
