import * as actionTypes from '../store/constants/actions';
import { store } from '../store/constants/store';
import { getERC20Contract } from './contract-utilities';

export const updateTokenBalances = (publicKey, tokens) => {
  tokens.forEach(token => {
    const contract = getERC20Contract(token.contractAddress);
    contract.methods.balanceOf(publicKey).call().then(balance => {
      updateTokenBalance(token.name, balance);
    }).catch(err => {
      updateTokenBalance(token.name, 0);
    });
  });
};

export const updateTokenBalance = (tokenName, balance) => store.dispatch({
  type: actionTypes.UPDATE_ACCOUNT_BALANCE,
  payload: {
    name: tokenName,
    balance: balance
  }
});
