/*eslint-disable*/
import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

const API_URL = 'http://localhost:3090';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}/signup`, formProps);
    console.log('RESPONSE DATA', response.data);
    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });

    localStorage.setItem('token', response.data.token);
    callback();
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Missing required field(s) or this e-mail is already in use',
    });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}/signin`, formProps);
    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('currentUserId', response.data.currentUserId);
    callback();
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid login credentials',
    });
  }
};



export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUserId');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
