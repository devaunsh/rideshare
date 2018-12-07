import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from './js/redux/reducers/index';
import Main from './js/Main';

import './index.css';
import './css/bootstrap/bootstrap.min.css'

import 'font-awesome/css/font-awesome.min.css';
//import 'bootstrap-css-only/css/bootstrap.min.css';

//import 'node_modules/react-star-rating/dist/css/react-star-rating.min.css'


const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware(), thunk, ...middlewares));
const history = createHistory();

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
      		<Router history={history}>
      			<Main />
      	  </Router>
      	</Provider>
    )
  }
}
