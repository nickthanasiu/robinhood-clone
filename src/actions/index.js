/*eslint-disable*/
import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps) => async dispatch => {
  try {
    console.log('SIGNING UP USER: ', formProps);
    const response = await axios.post('http://localhost:3090/signup', formProps);
    console.log('RESPONSE DATA', response.data);
    dispatch({
      type: AUTH_USER,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'This email is already in use',
    });
  }
};
