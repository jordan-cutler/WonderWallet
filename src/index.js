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


axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=LRC,ETH,APPC,EOS,SNOV,WETH&tsyms=USD').then(res => {
  const lrcValue = res.data.LRC.USD;
  const ethValue = res.data.ETH.USD;
  const eosValue = res.data.EOS.USD;
  const snovValue = res.data.SNOV.USD;
  const appcValue = res.data.APPC.USD;
  store.dispatch({type: actionTypes.UPDATE_TOKENS_TO_USD, payload: {
    Ethereum: ethValue,
    AppCoin: appcValue,
    EOS: eosValue,
    Loopring: lrcValue,
    Snovio: snovValue,
    WETH: ethValue
  }});
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
