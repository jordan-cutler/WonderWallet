import React, { Component } from 'react';
import './App.css';
import * as actionTypes from './store/actions';
import { connect } from 'react-redux';
import TokenCard from './components/token-card';
import Wally from './assets/walrus.png';
import Favorites from './components/favorites';

const VITALIK_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
const SNOVIO_ADDRESS = '0xBDC5bAC39Dbe132B1E030e898aE3830017D7d969';

class App extends Component {
  state = {
    passwordForNewKeystore: '',
    passwordForUploadedKeystore: '',
    keyStoreFileUploaded: null,
    transactionAmount: 0,
    recipientAddress: '',
    enteredTicker: '',
    enteredDecimals: '',
    enteredContractAddress: ''
  };

  doStuff() {
    const contractAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
    const wethContract = this.getERC20Contract(contractAddress);
    const myAddress = '0xd8F4d1493ec3b76674856b4c01dF4d337B3df97D';
    wethContract.methods.balanceOf(myAddress).call().then(balance => {
      console.log(balance);
    });

    // const abi = wethContract.methods.transfer('0x4d8a1663c0fa4dcd9000c5f72cc4af0dad2884dd', this.props.web3.utils.toWei('0.1', 'ether')).encodeABI();
    // const rawTransaction = {
    //   "from": this.props.publicKey,
    //   "gas": "400000",
    //   "to": contractAddress,
    //   "value": "0x0",
    //   "data": abi
    // };
    // const signedTransaction = this.props.signTransactionFn(rawTransaction);
    // console.log(signedTransaction);
    // signedTransaction.then(transactionObj => {
    //   this.props.web3.eth.sendSignedTransaction(transactionObj.rawTransaction)
    //     .on('receipt', (receipt) => {
    //       console.log(receipt)
    //     })
    //     .on('confirmation', (confirmation) => {
    //       console.log('confirmed',confirmation);
    //     })
    //     .on('error', (error) => {
    //       console.log('error occurred sending transaction', error);
    //     })
    // });


    const loopringContractAddress = '0x1B923812146bA032db7e99feC891f67624B42895';
    const loopringContract = this.getERC20Contract(loopringContractAddress);
    loopringContract.methods.balanceOf(myAddress).call().then(balance => {
      console.log('balancelrc', balance);
    });
    const lrcTransaction = {
      'from': this.props.publicKey,
      'gas': '400000',
      'to': loopringContractAddress,
      'value': this.props.web3.utils.toWei('0.1', 'ether')
    };
    const lrcSignedTransaction = this.props.signTransactionFn(lrcTransaction);
    console.log(lrcSignedTransaction);
    lrcSignedTransaction.then(transactionObj => {
      this.props.web3.eth.sendSignedTransaction(transactionObj.rawTransaction)
        .on('receipt', (receipt) => {
          console.log(receipt);
          loopringContract.methods.balanceOf(myAddress).call().then(balance => {
            console.log('balancelrc', balance);
          });
        })
        .on('confirmation', (confirmation) => {
          console.log('confirmed', confirmation);
        })
        .on('error', (error) => {
          console.log('error occurred sending transaction', error);
        });
    });

  }

  render() {

    // (this.state.transactionAmount * this.props.tokenToUsd[(this.props.currentlySelectedToken || {}).name]).toFixed(2) || 'Unknown'
    let currentDollarValueOfAmountEntered;
    if (this.state.transactionAmount && this.props.currentlySelectedToken && this.props.tokenToUsd[this.props.currentlySelectedToken.name]) {
      currentDollarValueOfAmountEntered = this.state.transactionAmount * this.props.tokenToUsd[this.props.currentlySelectedToken.name].toFixed(2);
    } else if (!this.state.transactionAmount) {
      currentDollarValueOfAmountEntered = '0';
    } else if (!this.props.currentlySelectedToken) {
      currentDollarValueOfAmountEntered = 'Unknown';
    }

    if (this.props.screen === 0) {
      return (
        <div style={{marginTop: 50}}>
          <div className="row topRow center-align">
            <img className="wally" src={Wally}/>
            <div className="wonder center-align">W&#0246;nderWallet</div>
            <div className="tagline center-align"><b>Hey! I am Wally.</b> Is this your first time
              with Etherium? That is awesome. Put in a strong, secure password so we can secure your
              ethereum account.
            </div>
          </div>
          <div className="row bottomRow">
            <div className="container center-align">
              <h4>Get a Keystore</h4>
              <form action="#">
                <div className="row formRow">
                  <div className="col m3"></div>
                  <div className="input-field col s12 m6">
                    <i className="material-icons prefix">lock</i>
                    <input onChange={(event) => this.setState({
                      passwordForNewKeystore: event.target.value
                    })} id="password" type="password" className="validate"/>
                  </div>
                </div>
                <a
                  onClick={() => this.downloadKeystore(this.state.passwordForNewKeystore)}
                  className="btn waves-effect btn-black btn-bottom waves-light"
                >
                  Generate My Keystore
                </a>
              </form>

              <div className="container hide">
                <p className="waves-effect btn-black btn-bottom waves-light btn-large">
                  <i className="material-icons">file_download</i>Download My Keystore
                </p>
              </div>
              <div className="chipz">
                <div onClick={this.props.goInitialState} className="chip chip-custom">
                  Create A Keystore
                </div>
                <div onClick={this.props.goCreationState} className="chip chip-custom active-chip">
                  Upload A Keystore
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.screen === 1) {
      return (
        <div style={{marginTop: 50}}>
          <div className="row topRow center-align">
            <img className="wally" src={Wally}/>
            <div className="wonder center-align">W&#0246;nderWallet</div>
            <div className="tagline center-align"><b>Hey! Welcome back.</b> Put in your awesome
              password so we can help you access your ethereum account.
            </div>
          </div>
          <div className="row bottomRow">
            <div className="container center-align">
              <h4>Upload a Keystore</h4>
              <form action="#">
                <div className="row formRow">
                  <div className="col m3"></div>
                  <div className="col s12 m6 file-field input-field">
                    <div className="btn btn-black">
                      <span>File</span>
                      <input
                        type="file"
                        name="keystoreInput"
                        onChange={(event) => this.setState({
                          keyStoreFileUploaded: event.target.files[0]
                        })}
                        onClick={(event) => event.target.result = null}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input id="filename" className="btn-black file-path validate" type="text"
                             value="Upload Keystore Here" readOnly={true}/>
                    </div>
                  </div>
                </div>
                <div className="row formRow">
                  <div className="col m3"></div>
                  <div className="input-field col s12 m6">
                    <i className="material-icons prefix">lock_open</i>
                    <input
                      id="password"
                      type="password"
                      className="validate"
                      onChange={(event) => this.setState({
                        passwordForUploadedKeystore: event.target.value
                      })}
                    />
                  </div>
                </div>
                <a
                  onClick={() => this.uploadKeystore(this.state.keyStoreFileUploaded, this.state.passwordForUploadedKeystore)}
                  className="btn btn-black btn-bottom waves-effect waves-light"
                >
                  Submit
                </a>
              </form>
              <div>
                <div onClick={this.props.goInitialState} className="chip chip-custom active-chip">
                  Create A Keystore
                </div>
                <div onClick={this.props.goCreationState} className="chip chip-custom">
                  Upload A Keystore
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
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
                  <h5>= ${currentDollarValueOfAmountEntered} USD</h5>
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
                        balance={token.symbol === 'ETH' ? this.props.accountBalance : (this.props.tokenBalances[token.name] / token.decimals)}
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
                        value="18"
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
              <div className="col center-align">
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
  }

  transact(token, recipientAddress, transactionAmount) {
    if ((recipientAddress.startsWith('0x') && recipientAddress.length !== 42) || recipientAddress.length !== 40) {
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
    console.log(signedTransaction);
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

  downloadKeystore(password) {
    if (password.length < 9) {
      alert('passwordForNewKeystore must be at least 9 characters long');
      return;
    }
    const element = document.createElement('a');
    element.style.display = 'none';
    const acc = this.props.web3.eth.accounts.create();
    const keystore = this.props.web3.eth.accounts.encrypt(
      acc.privateKey,
      password
    );
    //let o = {toString: function(){ return ""}};
    keystore.toString = function() {
      return '';
    };
    element.setAttribute('href', URL.createObjectURL(new Blob([JSON.stringify(keystore), {type: 'text/plain'}])));
    element.setAttribute('download', this.generateFileName(acc.address));
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    this.setStatePropertiesFromKeystoreThenGoToMainState(keystore);
    this.updateTokenBalances(keystore.address);
  }

  generateFileName(publicKey) {
    const today = new Date();
    return `UTC--${today}-${publicKey}.json`;
  }

  addNewToken(address, symbol, decimals) {
    const contract = this.getERC20Contract(address);
    // change the parameters to the contractAddress and symbol later on.
    return this.verifyERC20AndUpdateBalance(address).then((successful) => {
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
      return false;
    });
  }

  uploadKeystore(fileObject, password) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // the -15 gets rid of [object Object] at the end of the string. Don't know why it's there
      let json;
      if (e.target.result.includes('[object Object]')) {
        json = JSON.parse(e.target.result.substring(0, e.target.result.length - 15));
      } else {
        json = JSON.parse(e.target.result);
        json['crypto'] = json['Crypto'];
      }
      console.log(json);
      const keystore = this.props.web3.eth.accounts.decrypt(json, password);
      if (keystore) {
        this.setStatePropertiesFromKeystoreThenGoToMainState(keystore);
        this.updateTokenBalances(keystore.address);
      } else {
        alert('password entered incorrectly');
      }
    };
    reader.readAsText(fileObject);
  }

  updateTokenBalances(publicKey) {
    const tokens = this.props.tokens.slice(1); // get rid of ethereum token at beginning. we get balance by doing this.props.accountBalance
    tokens.forEach(token => {
      const contract = this.getERC20Contract(token.contractAddress);
      contract.methods.balanceOf(publicKey).call().then(balance => {
        this.props.updateTokenBalance(token.name, balance);
      }).catch(err => {
        this.props.updateTokenBalance(token.name, 0);
      });
    });
  }

  setStatePropertiesFromKeystoreThenGoToMainState(keystore) {
    return this.setStatePropertiesFromKeystore(keystore)
      .then(() => {
        this.props.goMainState();
      });
  }

  setStatePropertiesFromKeystore(keystore) {
    const publicKey = keystore.address;
    return this.props.web3.eth.getBalance(publicKey).then(balance => {
      this.props.setAccountBalance(this.props.web3.utils.fromWei(balance, 'ether'));
      this.props.setPrivateKey(keystore.privateKey);
      this.props.setPublicKey(publicKey);
      this.props.setSignTransactionFunction(keystore.signTransaction);
    });
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    screen: state.screen,
    favorites: state.favorites,
    privateKey: state.privateKey,
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
    goInitialState: () => dispatch({type: actionTypes.SET_INITIAL_STATE}),
    goCreationState: () => dispatch({type: actionTypes.SET_CREATION_STATE}),
    goMainState: () => dispatch({type: actionTypes.SET_MAIN_STATE}),
    setPrivateKey: (privateKey) => dispatch({
      type: actionTypes.SET_PRIVATE_KEY,
      payload: privateKey
    }),
    setPublicKey: (publicKey) => dispatch({type: actionTypes.SET_PUBLIC_KEY, payload: publicKey}),
    setAccountBalance: (accountBalance) => dispatch({
      type: actionTypes.SET_ACCOUNT_BALANCE,
      payload: accountBalance
    }),
    setSignTransactionFunction: (signTransactionFunction) => dispatch({
      type: actionTypes.SET_SIGN_TRANSACTION_FUNCTION,
      payload: signTransactionFunction
    }),
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
