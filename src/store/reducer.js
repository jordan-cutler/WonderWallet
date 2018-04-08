import Web3 from 'web3';
import * as states from './states';
import * as actionTypes from './actions';
import * as constants from './constants';
import EthereumImage from '../assets/ethereum.png';
import AppCoinImage from '../assets/appcoins.png';
import EOSImage from '../assets/eos.png';
import SnovioImage from '../assets/snovio.png';
import WethImage from '../assets/weth.png';
import LoopringImage from '../assets/loopring.png';

let web3 = new Web3('https://rinkeby.infura.io/4VagvCAdkEkPEFAJw8LU');

const favoritesArray = [
  {
    publicID: '0xd8F4d1493ec3b76674856b4c01dF4d337B3df97D',
    color: '#8E4A49'
  },
  {
    publicID: '0x4d8a1663c0fa4dcd9000c5f72cc4af0dad2884dd',
    color: '#2B59C3'
  },
  {
    publicID: '0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5',
    color: '#533A7B'
  },
  {
    publicID: '0x002053Fb39b623F7961822c581B0673a9C03De43',
    color: '#253C78'
  },
  {
    publicID: '0xc3e7f39030093ebebc1f8fd66f63a468ea91d3d9',
    color: '#D36582'
  }
];//JSON.parse(localStorage.getItem('favoritesArray')) || [];

const defaultTokens = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    contractAddress: null,
    decimals: 18,
    image: EthereumImage
  },
  {
    name: 'AppCoin',
    symbol: 'APPC',
    contractAddress: '0x1a7a8BD9106F2B8D977E08582DC7d24c723ab0DB',
    decimals: 18,
    image: AppCoinImage
  },
  {
    name: 'EOS',
    symbol: 'EOS',
    contractAddress: '0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0',
    decimals: 18,
    image: EOSImage
  },
  {
    name: 'Loopring',
    symbol: 'LRC',
    contractAddress: '0xEF68e7C694F40c8202821eDF525dE3782458639f',
    decimals: 18,
    image: LoopringImage
  },
  {
    name: 'Snovio',
    symbol: 'SNOV',
    contractAddress: '0xBDC5bAC39Dbe132B1E030e898aE3830017D7d969',
    decimals: 18,
    image: SnovioImage
  },
  {
    name: 'WETH',
    symbol: 'WETH',
    contractAddress: '0x2956356cD2a2bf3202F771F50D3D14A367b48070',
    decimals: 18,
    image: WethImage
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
  tokenBalances: constants.tokenBalances,
  tokenToUsd: {},
  currentlySelectedToken: defaultTokens[0]
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
    case actionTypes.UPDATE_TOKENS_TO_USD:
      return {
        ...state,
        tokenToUsd: action.payload
      };
    case actionTypes.UPDATE_CURRENTLY_SELECTED_TOKEN:
      return {
        ...state,
        currentlySelectedToken: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
