import { createStore, combineReducers } from 'redux';

import userNameReducer from '../reducers/setUserName';
import websocketConnection from '../reducers/websocketConnection';

export default createStore(
  combineReducers({
    user: userNameReducer,
    connection: websocketConnection,
  })
);