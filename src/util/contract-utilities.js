import { store } from '../store/constants/store';

export const getERC20Contract = (address) => {
  const web3 = store.getState().web3;
  return new web3.eth.Contract([
    {
      'constant': true,
      'inputs': [],
      'name': 'name',
      'outputs': [
        {
          'name': '',
          'type': 'string'
        }
      ],
      'payable': false,
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'symbol',
      'outputs': [
        {
          'name': '',
          'type': 'string'
        }
      ],
      'payable': false,
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': '_from',
          'type': 'address'
        },
        {
          'name': '_to',
          'type': 'address'
        }
      ],
      'name': 'transferFrom',
      'outputs': [
        {
          'name': 'success',
          'type': 'bool'
        }
      ],
      'payable': false,
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'totalSupply',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'decimals',
      'outputs': [
        {
          'name': '',
          'type': 'uint8'
        }
      ],
      'payable': false,
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': '_to',
          'type': 'address'
        },
        {
          'name': '_value',
          'type': 'uint256'
        }
      ],
      'name': 'transfer',
      'outputs': [],
      'payable': false,
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': '_owner',
          'type': 'address'
        }
      ],
      'name': 'balanceOf',
      'outputs': [
        {
          'name': 'balance',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'type': 'function'
    }
  ], address);
};
