import Web3 from 'web3';
let web3 = new Web3("https://rinkeby.infura.io/4VagvCAdkEkPEFAJw8LU");

const initialState = {
  web3: web3
};

const reducer = (state = initialState, action) => {
  return state;
};

export default reducer;
