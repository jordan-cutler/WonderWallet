import Web3 from 'web3';
import * as states from './states';
import * as actionTypes from './actions';
let web3 = new Web3("https://rinkeby.infura.io/4VagvCAdkEkPEFAJw8LU");

const favoritesArray = JSON.parse(localStorage.getItem('favoritesArray')) || [];

const initialState = {
  web3: web3,
  favorites: favoritesArray,
  screen: states.INITIAL_STATE,
  privateKey: '',
  publicKey: '',
  accountBalance: '',
  signTransactionFn: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INITIAL_STATE:
      return {
        ...state,
        screen: states.INITIAL_STATE
      };
    case actionTypes.SET_CREATION_STATE:
      return {
        ...state,
        screen: states.CREATION_STATE
      };
    case actionTypes.SET_MAIN_STATE:
      return {
        ...state,
        screen: states.MAIN_STATE
      };
    case actionTypes.SET_PUBLIC_KEY:
      return {
        ...state,
        publicKey: action.payload
      };
    case actionTypes.SET_PRIVATE_KEY:
      return {
        ...state,
        privateKey: action.payload
      };
    case actionTypes.SET_ACCOUNT_BALANCE:
      return {
        ...state,
        accountBalance: action.payload
      };
    case actionTypes.SET_SIGN_TRANSACTION_FUNCTION:
      return {
        ...state,
        signTransactionFn: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
