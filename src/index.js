import * as actionTypes from './store/actions';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import axios from 'axios';

const store = createStore(reducer);


axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').then(res => {
  const value = res.data.USD;
  store.dispatch({type: actionTypes.UPDATE_ETH_TO_USD, payload: value});
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
