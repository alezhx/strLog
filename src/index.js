import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from 'redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios'
import { actions } from 'redux/actions'
// import { AESTool } from 'utils'

const { store, persistor } = configureStore()

// const token = localStorage.getItem('jwtToken');
// AESTool.decrypt(token, undefined, 
//   (decryptedToken) => store.dispatch(actions.verifyTHUNK(decryptedToken)),
//   (error) => {
//     console.log('Decrypt promise error: ', error)
//     store.dispatch(actions.toggleAuthOff())
//   }
// );

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
, document.getElementById('root'));

axios.interceptors.response.use(response => response, error => {
  const status = error.status || error.response.status
  if(status === 401) {
    store.dispatch(actions.toggleAuthOff())
  };
  return error;
});

serviceWorker.unregister();
