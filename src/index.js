import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/app/App';
import configureStore from './components/store/configureStore';

import { setUserName } from './components/actions/setUserName';

const store = configureStore;

// store.dispatch(setUserName( { userName: 'bob' } ))

console.log('from index.js', store.getState());

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));