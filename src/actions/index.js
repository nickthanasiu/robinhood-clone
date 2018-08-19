/*eslint-disable*/
import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    console.log('SIGNING UP USER: ', formProps);
    const response = await axios.post('http://localhost:3090/signup', formProps);
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

export const signin = (formProps) => async dispatch => {
  try {
    console.log('YOU ARE SIGNING IN');
    const response = await axios.post('http://localhost:3090/signin', formProps);

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid login credentials'
    });
  }
};

export const signout = () => {
  console.log('YOU ARE SIGNING OUT!');
  local.Storage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
