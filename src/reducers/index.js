import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import companies from './companies';

export default combineReducers({
  auth,
  companies,
  form: formReducer,
});
