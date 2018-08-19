import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from '@components/App';
import SignupPage from '@components/SignupPage';
import SigninPage from '@components/SigninPage';

import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={SigninPage} />
      <Route path="/signup" component={SignupPage} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
