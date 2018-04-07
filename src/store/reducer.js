import Web3 from 'web3';
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const initialState = {
  web3: web3
};

const reducer = (state = initialState, action) => {
  return state;
};

export default reducer;
