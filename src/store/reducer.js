import Web3 from 'web3';
import * as states from './states';
import * as actionTypes from './actions';
import * as constants from './constants';

let web3 = new Web3('https://mainnet.infura.io/4VagvCAdkEkPEFAJw8LU ');

const favoritesArray = JSON.parse(localStorage.getItem('favoritesArray')) || [];

const defaultTokens = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    contractAddress: null,
    decimals: 18
  },
  {
    name: 'AppCoin',
    symbol: 'APPC',
    contractAddress: '0x1a7a8BD9106F2B8D977E08582DC7d24c723ab0DB',
    decimals: 18
  },
  {
    name: 'EOS',
    symbol: 'EOS',
    contractAddress: '0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0',
    decimals: 18
  },
  {
    name: 'Loopring',
    symbol: 'LRC',
    contractAddress: '0xEF68e7C694F40c8202821eDF525dE3782458639f',
    decimals: 18

  },
  {
    name: 'Snovio',
    symbol: 'SNOV',
    contractAddress: '0xBDC5bAC39Dbe132B1E030e898aE3830017D7d969',
    decimals: 18
  },
  {
    name: 'WETH',
    symbol: 'WETH',
    contractAddress: '0x2956356cD2a2bf3202F771F50D3D14A367b48070',
    decimals: 18
  }
];

const initialState = {
  web3: web3,
  favorites: favoritesArray,
  screen: states.INITIAL_STATE,
  privateKey: '',
  publicKey: '',
  accountBalance: '',
  signTransactionFn: null,
  tokens: defaultTokens,
  tokenBalances: constants.tokenBalances
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
    case actionTypes.UPDATE_ACCOUNT_BALANCE:
      return {
        ...state,
        tokenBalances: {
          ...state.tokenBalances,
          [action.payload.token]: action.payload.balance
        }
      };
    default:
      return state;
  }
};

export default reducer;
