import { createStore, combineReducers } from 'redux';

import userNameReducer from '../reducers/setUserName';
import userMessageReducer from '../reducers/userMessage';
import getMessagesReducer from '../reducers/getMessages';
import connectionStatus from '../reducers/connectionStatus';
import windowVisibility from '../reducers/windowVisibility';
import windowVisibilityTime from '../reducers/visibilityTime';
import notifyMessages from '../reducers/notifyMessages';
import offlineMessages from '../reducers/offlineMessages';

export default createStore(
  combineReducers({
    user: userNameReducer,
    userMessage: userMessageReducer,
    messages: getMessagesReducer,
    connected: connectionStatus,
    windowVisibility: windowVisibility,
    windowVisibilityTime: windowVisibilityTime,
    notifyMessages: notifyMessages,
    offlineMessages: offlineMessages,
  })
);