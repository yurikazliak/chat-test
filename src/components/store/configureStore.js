import { createStore, combineReducers } from 'redux';

import userNameReducer from '../reducers/setUserName';
import userMessageReducer from '../reducers/userMessage';
import getMessagesReducer from '../reducers/getMessages';
import connectionStatus from '../reducers/connectionStatus';
import notifications from '../reducers/notifications';

export default createStore(
  combineReducers({
    user: userNameReducer,
    userMessage: userMessageReducer,
    messages: getMessagesReducer,
    connected: connectionStatus,
    notifications: notifications,
  })
);