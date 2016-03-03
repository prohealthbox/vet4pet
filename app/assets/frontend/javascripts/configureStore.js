'use strict';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index';
import DevTools from './containers/DevTools';
import { routerStateReducer,routerMiddleware, browserHistory, routerReducer } from 'react-router-redux';

export default function configureStore(initialState) {
  const routemiddleware = routerMiddleware(browserHistory);
  const store = createStore(
    combineReducers({
      rootReducer,
      routing: routerReducer // , router: routerStateReducer
     }),
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, routemiddleware, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
