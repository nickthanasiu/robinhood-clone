import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from '@components/App';
import HomePage from '@components/HomePage';
import SignupPage from '@components/SignupPage';
import SigninPage from '@components/SigninPage';
import SignoutPage from '@components/SignoutPage';
import AccountPage from '@components/AccountPage';

import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/signout" component={SignoutPage} />
        <Route path="/account" component={AccountPage} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
