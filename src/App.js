import React, { Component } from 'react';
import './App.css';

const VITALIK_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
const SNOVIO_ADDRESS = '0xBDC5bAC39Dbe132B1E030e898aE3830017D7d969';

class App extends Component {
  state = {
    contractAddress: '',
    contractSymbol: '',
    passwordForNewKeystore: '',
    passwordForUploadedKeystore: '',
    keyStoreFileUploaded: null
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
    // const acc = this.props.web3.eth.accounts.create();
    // console.log(acc);
    // console.log(this.props.web3.eth.accounts.create('hello'));

    if (this.props.screen === 0) {
      return (
        <div style={{marginTop: 50}}>
          <div className="row topRow center-align">
            <div className="wonder center-align">W&#0246;nderWallet</div>
            <div className="tagline center-align">It is time to blockchain human again</div>
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
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <button
                  onClick={() => this.downloadKeystore(this.state.passwordForNewKeystore)}
                  className="btn waves-effect btn-black btn-bottom waves-light"
                >
                  Generate My Keystore
                </button>
              </form>

              <div className="container hide">
                <p className="waves-effect btn-black btn-bottom waves-light btn-large">
                  <i className="material-icons">file_download</i>Download My Keystore
                </p>
              </div>
              <div className="chipz">
                <div className="chip chip-custom active-chip">
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
    } else if (this.props.screen === 1) {
      return (
        <div style={{marginTop: 50}}>
          <div className="row topRow center-align">
            <div className="wonder center-align">W&#0246;nderWallet</div>
            <div className="tagline center-align">It is time to blockchain human again</div>
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
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <button
                  onClick={() => this.uploadKeystore(this.state.keyStoreFileUploaded, this.state.passwordForUploadedKeystore)}
                  className="btn btn-black btn-bottom waves-effect waves-light"
                >
                  Submit
                </button>
              </form>
              <div>
                <div onClick={this.goInitialState} className="chip chip-custom">
                  Create A Keystore
                </div>
                <div className="chip chip-custom active-chip">
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
          <div className="row topRow center-align">
            <div className="wonder center-align">W&#0246;nderWallet</div>
            <div className="tagline center-align">it is time to blockchain human again</div>
          </div>

          <div className="row bottomRow">
            <hr className="divider"></hr>
            <div className="row col s12 grey white-text">
              <div className="row friendTitleRow">
                <div className="col s12 left-align">
                  <h4 className="friendTitle">Friends</h4>
                </div>
              </div>
              <div className="carousel carousel-slider center friendSlider">
                <div className="friendContainer">
                  <div className="row">
                    <div className="col s12 carousel-item white-text" href="#one!">
                      <ul className="collection with-header col s12 m4 center-align friendCollec">
                        <li className="collection-item friend hack1">
                          <div className="hack1">
                            <div>
                              <div className="right-align col s12 editbutton"><a
                                className="btn-floating btn-small hackbutton1"><i
                                className="material-icons hackbutton1">mode_edit</i></a></div>
                              <div className="center-align row">
                                <div className="col s4">
                                  <i className="center-align large material-icons">insert_chart</i>
                                </div>
                                <div className="col s6">
                                  <p>PUBLIC KEY 1</p>
                                  <a className="waves-effect waves-light btn hackbutton1">Pay
                                    Me
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="collection-item friend hack3">
                          <div className="hack3">
                            <div>
                              <div className="right-align col s12 editbutton"><a
                                className="btn-floating btn-small hackbutton3"><i
                                className="material-icons hackbutton3">mode_edit</i></a></div>
                              <div className="center-align row">
                                <div className="col s4">
                                  <i className="center-align large material-icons">insert_chart</i>
                                </div>
                                <div className="col s6">
                                  <p>PUBLIC KEY 1</p>
                                  <a className="waves-effect waves-light btn hackbutton3">Pay
                                    Me</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12 carousel-item white-text" href="#one!">
                      <ul className="collection with-header col s12 m4 center-align friendCollec">
                        <li className="collection-item friend hack2">
                          <div className="hack2">
                            <div>
                              <div className="right-align col s12 editbutton"><a
                                className="btn-floating btn-small hackbutton2"><i
                                className="material-icons hackbutton2">mode_edit</i></a></div>
                              <div className="center-align row">
                                <div className="col s4">
                                  <i className="center-align large material-icons">insert_chart</i>
                                </div>
                                <div className="col s6">
                                  <p>PUBLIC KEY 1</p>
                                  <a className="waves-effect waves-light btn hackbutton2">Pay
                                    Me</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="collection-item friend hack1">
                          <div className="hack1">
                            <div>
                              <div className="right-align col s12 editbutton"><a
                                className="btn-floating btn-small hackbutton1"><i
                                className="material-icons hackbutton1">mode_edit</i></a></div>
                              <div className="center-align row">
                                <div className="col s4">
                                  <i
                                    className="center-align large material-icons">insert_chart</i>
                                </div>
                                <div className="col s6">
                                  <p>PUBLIC KEY 1</p>
                                  <a className="waves-effect waves-light btn hackbutton1">Pay
                                    Me</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row col s12 m12">
              <div className="col s12">
                <strong><span className="myinformation">My Information</span></strong>
              </div>
              <div className="col s12 m6">
                <h6><strong>Public Key:</strong></h6>
                <h6>KSDJRGHWIRUHSNVIDLNKBLXN</h6>
              </div>
              <div className="col s12 m6">
                <h6><strong>Current Balance:</strong></h6>
                <h6>100000 ETH | $420.69 USD</h6>
              </div>
            </div>

            <div className="row col s12">
              <hr></hr>
              <h5>Make a Payment:</h5>

              <form className="col s12">
                <div className="row formRow">
                  <div className="row formRow">
                    <div className="col m1"></div>
                    <div className="input-field col s12 m10 finalForm">
                      <i className="material-icons prefix">face</i>
                      <textarea id="receiver" className="materialize-textarea"></textarea>
                      <label htmlFor="receiver">Receiver Public Key</label>
                    </div>
                    <div className="col m1"></div>
                  </div>
                  <div className="row formRow">
                    <div className="col m1"></div>
                    <div className="input-field col s7 m7">
                      <i className="material-icons prefix">local_atm</i>
                      <textarea id="amount" className="materialize-textarea"></textarea>
                      <label htmlFor="amount">Amount</label>
                    </div>
                    <div className="input-field col s5 m3">
                      <h5>= $666.69 USD</h5>
                    </div>
                    <div className="col m1"></div>
                  </div>
                </div>
                <div className="row formRow">
                  <div value="ETH" className="col s3 m1 coinActive">
                    <p></p>
                    <img className="logoSpec circle" src="images/ethereum.png"/>
                    <p className="center-align description">Ethereum (ETH)</p>
                  </div>
                  <div value="APPC" className="col s3 m1 coinInactive">
                    <p></p>
                    <img className="logo circle" src="images/appcoins.png"/>
                    <p className="center-align description">AppCoins (APPC)</p>
                  </div>
                  <div value="EOS" className="col s3 m1 coinInactive">
                    <p></p>
                    <img className="logoSpec circle" src="images/eos.png"/>
                    <p className="center-align description">EOS (EOS)</p>
                  </div>
                  <div value="LRC" className="col s3 m1 coinInactive">
                    <p></p>
                    <img className="logo circle" src="images/loopring.png"/>
                    <p className="center-align description">Loopring (LRC)</p>
                  </div>
                  <div value="SNOV" className="col s3 m1 coinInactive">
                    <p></p>
                    <img className="logo circle" src="images/snovio.png"/>
                    <p className="center-align description">Snovio (SNOV)</p>
                  </div>
                  <div value="WETH" className="col s3 m1 coinInactive">
                    <p></p>
                    <img className="logo circle" src="images/weth.png"/>
                    <p className="center-align description">WETH (WETH)</p>
                  </div>
                  <div value="other" className="col s3 m1 coinInactive">
                    <p></p>
                    <img className="logo circle" src="images/plus.png"/>
                    <p className="center-align description">Other</p>
                  </div>
                  <div className="col s3"></div>
                  <div className="col s12 m5">
                    <div className="row">
                      <div className="input-field col s6 finalForm">
                        <i className="material-icons prefix">textsms</i>
                        <input disabled type="text" id="ticker" className="autocomplete"/>
                        <label htmlFor="ticker">Ticker Lookup</label>
                      </div>
                      <div className="input-field col s6 finalForm">
                        <i className="material-icons prefix">zoom_in</i>
                        <input disabled type="text" id="decimal" placeholder="18"/>
                        <label htmlFor="decimal">Decimal Places</label>
                      </div>
                      <div className="input-field col s12 finalForm">
                        <i className="material-icons prefix">home</i>
                        <input disabled type="text" id="address"/>
                        <label htmlFor="address">Contract Address</label>
                      </div>
                      <div className="col s2"></div>
                      <div className="col s8 center-align">
                        <a className="waves-effect waves-light btn-large">Complete Transaction</a>
                      </div>
                      <div className="col s2"></div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
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
    element.setAttribute('href', URL.createObjectURL(new Blob([JSON.stringify(keystore), {type: 'text/plain'}])));
    element.setAttribute('download', this.generateFileName(acc.address));
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    this.setStatePropertiesFromKeystoreThenGoToMainState(keystore);
  }

  generateFileName(publicKey) {
    const today = new Date();
    return `UTC--${today}-${publicKey}.json`;
  }

  addNewToken() {
    console.log(this.state.contractAddress);
    console.log(this.state.contractSymbol);
    const contract = this.getERC20Contract(SNOVIO_ADDRESS);
    // change the parameters to the contractAddress and symbol later on.
    return this.verifyERC20(SNOVIO_ADDRESS, 'SNOV').then((successful) => {
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

  verifyERC20(address, symbol) {
    const contract = this.getERC20Contract(address);
    return contract.methods.symbol().call()
      .then((symbolResponse) => {
        if (symbolResponse !== symbol) {
          return false;
        }
        return contract.methods.balanceOf(VITALIK_ADDRESS).call().then((balance) => {
          // just check if calling it doesn't throw any errors
          return true;
        }).catch(e => {
          return false;
        });
      }).catch(e => {
        return false;
      });
  }

  uploadKeystore(fileObject, password) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // the -15 gets rid of [object Object] at the end of the string. Don't know why it's there
      const keystore = this.props.web3.eth.accounts.decrypt(JSON.parse(e.target.result.substring(0, e.target.result.length - 15)), password);
      console.log(keystore);
      if (keystore) {
        this.setStatePropertiesFromKeystoreThenGoToMainState(keystore);
      } else {
        alert('password entered incorrectly');
      }
    };
    reader.readAsText(fileObject);
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
    signTransactionFn: state.signTransactionFn
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
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
