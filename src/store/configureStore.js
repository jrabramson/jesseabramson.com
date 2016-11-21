import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from '../reducers/index';

let createStoreWithMiddleware;

createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const rootReducer = combineReducers(reducers);

export default function configureStore() {
  let defaultState = {
    Terminal: {
      lines: [{
        method: 'comment',
        params: ['hello world'],
        line: 'comment hello world'
      }],
      dir: ['/jesse/']
    }
  };

  return createStoreWithMiddleware(rootReducer);
}
