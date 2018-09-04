import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import companies from './companies';
import newsfeed from './newsfeed';
import marketData from './marketData';

export default combineReducers({
  auth,
  companies,
  newsfeed,
  marketData,
  form: formReducer,
});
