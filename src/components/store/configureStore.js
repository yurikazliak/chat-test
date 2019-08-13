import { createStore, combineReducers } from 'redux';

import userNameReducer from '../reducers/setUserName';
import userMessageReducer from '../reducers/userMessage';
import getMessagesReducer from '../reducers/getMessages';
import connectionStatus from '../reducers/connectionStatus';

export default createStore(
  combineReducers({
    user: userNameReducer,
    userMessage: userMessageReducer,
    messages: getMessagesReducer,
    connected: connectionStatus,
  })
);