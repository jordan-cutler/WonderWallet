import Web3 from 'web3';
import EthereumImage from '../../assets/ethereum.png';
import AppCoinImage from '../../assets/appcoins.png';
import EOSImage from '../../assets/eos.png';
import SnovioImage from '../../assets/snovio.png';
import WethImage from '../../assets/weth.png';
import LoopringImage from '../../assets/loopring.png';
import * as states from './states';

const web3 = new Web3('https://mainnet.infura.io/4VagvCAdkEkPEFAJw8LU');

export const TOKEN_BALANCES_INITIAL = {
  AppCoin: 0,
  EOS: 0,
  Loopring: 0,
  Snovio: 0,
  WETH: 0
};

export const FAVORITES = JSON.parse(localStorage.getItem('FAVORITES')) || [
  {
    publicID: '0xd8F4d1493ec3b76674856b4c01dF4d337B3df97D',
    color: '#8E4A49',
    icon: 'pets'
  },
  {
    publicID: '0x4d8a1663c0fa4dcd9000c5f72cc4af0dad2884dd',
    color: '#2B59C3',
    icon: 'highlight'
  },
  {
    publicID: '0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5',
    color: '#533A7B',
    icon: 'audiotrack'
  },
  {
    publicID: '0x002053Fb39b623F7961822c581B0673a9C03De43',
    color: '#253C78',
    icon: 'videogame_asset'
  }
];

export const ADDED_TOKENS_INITIAL = JSON.parse(localStorage.getItem('ADDED_TOKENS')) || [];

export const DEFAULT_TOKENS = [
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

export const INITIAL_STATE = {
  web3: web3,
  favorites: FAVORITES,
  screen: states.CREATION_STATE,
  privateKey: '',
  publicKey: '',
  accountBalance: '',
  signTransactionFn: null,
  tokens: DEFAULT_TOKENS,
  tokenBalances: TOKEN_BALANCES_INITIAL,
  tokenToUsd: {},
  currentlySelectedToken: DEFAULT_TOKENS[0],
  addedTokens: ADDED_TOKENS_INITIAL
};

