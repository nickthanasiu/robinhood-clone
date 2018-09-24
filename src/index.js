import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from '@components/App';
import Welcome from '@components/Welcome';
import Dashboard from '@components/Dashboard';
import SignupPage from '@components/SignupPage';
import SigninPage from '@components/SigninPage';
import SignoutPage from '@components/SignoutPage';
import AccountPage from '@components/AccountPage';
import CompanyPage from '@components/CompanyPage';
import { loadState, saveState } from './localStorage';

import rootReducer from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/signout" component={SignoutPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/account" component={AccountPage} />
        <Route path="/company" component={CompanyPage} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
