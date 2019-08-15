import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/app/App';
import configureStore from './components/store/configureStore';

const store = configureStore;

// store.dispatch(setUserName( { userName: 'bob' } ))

// store.subscribe(() => {
//   console.log('from index.js', store.getState());
// })

// function select(state) {
//   // return state.messages.messages
//   return state.notifyMessages
// }

// let currentValue
// function handleChange() {
//   let previousValue = currentValue
//   currentValue = select(store.getState())

//   if (previousValue !== currentValue) {
//     console.log(
//       'Some deep nested property changed from',
//       previousValue,
//       'to',
//       currentValue
//     )
//   }
// }

// store.subscribe(handleChange)

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));