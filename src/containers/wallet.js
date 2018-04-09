import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/constants/actions';
import Favorites from '../components/favorites';
import Wally from '../assets/walrus.png';
import TokenCard from '../components/token-card';
import NewTokenCard from '../components/new-token-card';

class Wallet extends React.Component {
  state = {
    transactionAmount: 0,
    recipientAddress: '',
    enteredTicker: '',
    enteredDecimals: '',
    enteredContractAddress: ''
  };

  render() {
    // (this.state.transactionAmount * this.props.tokenToUsd[(this.props.currentlySelectedToken || {}).name]).toFixed(2) || 'Unknown'
    let currentDollarValueOfAmountEntered = '0';
    if (this.state.transactionAmount && this.props.currentlySelectedToken && this.props.tokenToUsd[this.props.currentlySelectedToken.name]) {
      currentDollarValueOfAmountEntered = this.state.transactionAmount * this.props.tokenToUsd[this.props.currentlySelectedToken.name].toFixed(2);
    } else if (!this.state.transactionAmount) {
      currentDollarValueOfAmountEntered = '0';
    } else if (!this.props.tokenToUsd[this.props.currentlySelectedToken.symbol]) {
      currentDollarValueOfAmountEntered = 'Unknown';
    }
    return (
      <div>
        <div className="row topRow center-align" style={{marginTop: 30, marginBottom: 30}}>
          <img className="wally" src={Wally}/>
          <div className="wonder center-align">W&#0246;nderWallet</div>
          <div className="tagline center-align"><b>Hey! Welcome back.</b></div>
        </div>
        <div className="row col s12 friendRow">
          <div className="friendContainer">
            <div className="row friendMin">
              <div className="col s12">
                <div className="row center-align">
                  <Favorites/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row col s12">
          <hr></hr>
          <div className="col s12">
            <strong><span className="myinformation">My Information:</span></strong>
          </div>
          <div className="col s12 m6">
            <h6><strong><b>Public Key:</b></strong></h6>
            <h6>{this.props.publicKey}</h6>
          </div>
          <div className="col s12 m6">
            <h6><strong><b>Current Balance:</b></strong></h6>
            <h6>{this.props.accountBalance} ETH
              | {(this.props.accountBalance * this.props.tokenToUsd['Ethereum']).toFixed(2)}
              USD</h6>
          </div>
        </div>

        <div className="row col s12">
          <hr></hr>
          <div className="col s12">
            <strong><span className="myinformation">Make a Payment:</span></strong>
          </div>
        </div>

        <form className="col s12">
          <div className="row formRow">
            <div className="row formRow">
              <div className="col m1"></div>
              <div className="input-field col s12 m10 finalForm">
                <i className="material-icons prefix">face</i>
                <textarea id="receiver" className="materialize-textarea"
                          onChange={(event) => this.setState({recipientAddress: event.target.value})}></textarea>
                <label htmlFor="receiver">Receiver Public Key</label>
              </div>
              <div className="col m1"></div>
            </div>
            <div className="row formRow">
              <div className="col m1"></div>
              <div className="input-field col s7 m7">
                <i className="material-icons prefix">local_atm</i>
                <textarea id="amount" className="materialize-textarea"
                          onChange={(event) => this.setState({transactionAmount: event.target.value})}></textarea>
                <label htmlFor="amount">Amount</label>
              </div>
              <div className="input-field col s5 m3">
                <h5>= {currentDollarValueOfAmountEntered} USD</h5>
              </div>
              <div className="col m1"></div>
            </div>
            <div className="row formRow">
              <div className="col s12 m6 row">
                {this.props.tokens.map(token => {
                  return (
                    <TokenCard
                      key={token.symbol}
                      name={token.name}
                      symbol={token.symbol}
                      image={token.image}
                      balance={token.symbol === 'ETH' ? this.props.accountBalance : (this.props.tokenBalances[token.name] / Math.pow(10, token.decimals))}
                      token={token}
                    />
                  );
                })}
                {this.props.addedTokens.map(token => {
                  return (
                    <NewTokenCard
                      key={token.symbol}
                      symbol={token.symbol}
                      balance={this.props.tokenBalances[token.symbol] / Math.pow(10, token.decimals)}
                      token={token}
                    />
                  );
                })}
              </div>
              <div className="col s12 m6 valign-wrapper">
                <div className="row">
                  <div className="col s12">
                    <h6>Use Another ECR Token</h6>
                  </div>
                  <div className="input-field col s6 finalForm">
                    <i className="material-icons prefix">textsms</i>
                    <input
                      type="text"
                      id="ticker"
                      onChange={(event) => this.setState({enteredTicker: event.target.value})}
                    />
                    <label htmlFor="ticker">Ticker</label>
                  </div>
                  <div className="input-field col s6 finalForm">
                    <i className="material-icons prefix">zoom_in</i>
                    <input
                      type="number"
                      id="decimal"
                      placeholder="18"
                      onChange={(event) => this.setState({enteredDecimals: Number(event.target.value)})}
                    />
                    <label htmlFor="decimal">Decimal Places</label>
                  </div>
                  <div className="input-field col s12 finalForm">
                    <i className="material-icons prefix">home</i>
                    <input
                      type="text"
                      id="address"
                      onChange={(event) => this.setState({enteredContractAddress: event.target.value})}
                    />
                    <label htmlFor="address">Contract Address</label>
                  </div>
                  <div className="col s12 finalForm center-align">
                    <a
                      className="waves-effect waves-light btn-large"
                      onClick={() => this.addNewToken(this.state.enteredContractAddress, this.state.enteredTicker, this.state.enteredDecimals)}
                    >
                      Add ERC20 Token
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row formRow">
            <div className="col s12 center-align">
              <a
                className="waves-effect waves-light btn completeTrans"
                onClick={() => this.transact(this.props.currentlySelectedToken, this.state.recipientAddress, this.state.transactionAmount)}
              >
                <h2>Complete Transaction</h2>
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }

  transact(token, recipientAddress, transactionAmount) {
    if (!((recipientAddress.startsWith('0x') && recipientAddress.length === 42) || recipientAddress.length === 40)) {
      alert('invalid recipient address');
      return;
    }
    const publicKey = this.props.publicKey;
    const amountInEther = this.props.web3.utils.toWei(transactionAmount, 'ether');
    let rawTransaction;
    if (token.name === 'Ethereum') {
      rawTransaction = {
        'from': publicKey,
        'gas': '21000',
        'to': recipientAddress,
        'value': amountInEther
      };
    } else {
      const contractAddress = token.contractAddress;
      const contract = this.getERC20Contract(contractAddress);
      const abi = contract.methods.transfer(recipientAddress, amountInEther).encodeABI();
      rawTransaction = {
        'from': publicKey,
        'gas': '400000',
        'to': contractAddress,
        'value': '0x0',
        'data': abi
      };
    }
    const signedTransaction = this.props.signTransactionFn(rawTransaction);
    signedTransaction.then(transactionObj => {
      this.props.web3.eth.sendSignedTransaction(transactionObj.rawTransaction)
        .on('receipt', (receipt) => {
          console.log(receipt);
        })
        .on('confirmation', (confirmation) => {
          console.log('confirmed', confirmation);
        })
        .on('error', (error) => {
          console.log('error occurred sending transaction', error);
        });
    });
  }

  addNewToken(address, symbol, decimals) {
    if (!symbol) {
      alert('Enter the symbol for the token');
      return;
    }
    if (!decimals) decimals = 18;
    if (!((address.startsWith('0x') && address.length === 42) || address.length === 40)) {
      alert('Invalid contract address');
      return;
    }
    const contract = this.getERC20Contract(address);
    // change the parameters to the contractAddress and symbol later on.
    return this.verifyERC20AndUpdateBalance(address, symbol).then((successful) => {
      this.props.addNewToken({
        symbol: symbol,
        contractAddress: address,
        decimals: decimals
      });
      return successful;
    });
  }

  getERC20Contract(address) {
    return new this.props.web3.eth.Contract([
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
  }

  verifyERC20AndUpdateBalance(address, symbol) {
    const contract = this.getERC20Contract(address);

    return contract.methods.balanceOf(this.props.publicKey).call().then((balance) => {
      this.props.updateTokenBalance(symbol, balance);
      return true;
    }).catch(e => {
      alert('Contract is not an ERC20 Token');
      return false;
    });
  }

}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    publicKey: state.publicKey,
    accountBalance: state.accountBalance,
    signTransactionFn: state.signTransactionFn,
    tokens: state.tokens,
    tokenBalances: state.tokenBalances,
    tokenToUsd: state.tokenToUsd,
    currentlySelectedToken: state.currentlySelectedToken,
    addedTokens: state.addedTokens
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTokenBalance: (tokenName, balance) => dispatch({
      type: actionTypes.UPDATE_ACCOUNT_BALANCE,
      payload: {
        name: tokenName,
        balance: balance
      }
    }),
    addNewToken: (token) => dispatch({
      type: actionTypes.ADD_NEW_TOKEN,
      payload: token
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

