import { store } from '../store/constants/store';
import * as actionTypes from '../store/constants/actions';

export const setStatePropertiesFromKeystoreThenGoToMainState = (keystore) => {
  return setStatePropertiesFromKeystore(keystore)
    .then(() => {
      goMainState();
    });
};

export const setStatePropertiesFromKeystore = (keystore) => {
  const publicKey = keystore.address;
  const web3 = store.getState().web3;
  return web3.eth.getBalance(publicKey).then(balance => {
    setAccountBalance(web3.utils.fromWei(balance, 'ether'));
    setPrivateKey(keystore.privateKey);
    setPublicKey(publicKey);
    setSignTransactionFunction(keystore.signTransaction);
  });
};

const goMainState = () => store.dispatch({type: actionTypes.SET_MAIN_STATE});
const setPrivateKey = (privateKey) => store.dispatch({
  type: actionTypes.SET_PRIVATE_KEY,
  payload: privateKey
});
const setPublicKey = (publicKey) => store.dispatch({type: actionTypes.SET_PUBLIC_KEY, payload: publicKey});
const setAccountBalance = (accountBalance) => store.dispatch({
  type: actionTypes.SET_ACCOUNT_BALANCE,
  payload: accountBalance
});
const setSignTransactionFunction = (signTransactionFunction) => store.dispatch({
  type: actionTypes.SET_SIGN_TRANSACTION_FUNCTION,
  payload: signTransactionFunction
});
