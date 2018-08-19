import { AUTH_USER } from './types';

export const signup = ({
  firstName,
  lastName,
  email,
  password
}) => (dispatch) => {
  console.log('SIGNING UP USER: ', firstName, lastName, email, password);
};
