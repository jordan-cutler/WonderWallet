import * as actionTypes from './store/constants/actions';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { STORE } from './store/constants/store';
import axios from 'axios';

axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=LRC,ETH,APPC,EOS,SNOV,WETH&tsyms=USD').then(res => {
  const lrcValue = res.data.LRC.USD;
  const ethValue = res.data.ETH.USD;
  const eosValue = res.data.EOS.USD;
  const snovValue = res.data.SNOV.USD;
  const appcValue = res.data.APPC.USD;
  STORE.dispatch({type: actionTypes.UPDATE_TOKENS_TO_USD, payload: {
    Ethereum: ethValue,
    AppCoin: appcValue,
    EOS: eosValue,
    Loopring: lrcValue,
    Snovio: snovValue,
    WETH: ethValue
  }});
});

ReactDOM.render(<Provider store={STORE}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
