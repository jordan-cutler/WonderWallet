import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Favorites from './components/favorites.js';
import Profile from './components/profile.js';
import * as actionTypes from './store/actions';
import classNames from 'classnames';
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

  render() {
    // const acc = this.props.web3.eth.accounts.create();
    // console.log(acc);
    // console.log(this.props.web3.eth.accounts.create('hello'));
    // const vitalikAccountBalance = this.props.web3.eth.getBalance(VITALIK_ADDRESS);
    // vitalikAccountBalance.then(console.log);
    // const keystore = this.props.web3.eth.accounts.encrypt(acc.privateKey, PASSWORD);
    // console.log(keystore);
    // const decrypted = this.props.web3.eth.accounts.decrypt(keystore, PASSWORD);
    // console.log('decrypted', decrypted);
    console.log(this.props.screen);
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
            <div className="tagline center-align">It is time to blockchain human again</div>
          </div>
          <div className="scrollmenu">
            <Favorites favoritesArray={this.props.favorites}/>
          </div>
          <div className="row fav-row">
            <ul className="collection with-header col s12 center-align sideBar"></ul>
          </div>
          <div className="row profile-row">
            <Profile />
          </div>
          <div className="row form-row">
            <div className="row col s12 m8">
              <hr></hr>
              <h4>Make a Payment:</h4>
              <form className="col s12">
                <div className="row formRow">
                  <div className="input-field col s12 m11">
                    <i className="material-icons prefix">face</i>
                    <textarea id="receiver" className="materialize-textarea"></textarea>
                    <label htmlFor="receiver">Receiver Public Key</label>
                  </div>
                </div>
                <div className="row formRow">
                  <div className="input-field col s7 m8">
                    <i className="material-icons prefix">local_atm</i>
                    <textarea id="amount" className="materialize-textarea"></textarea>
                    <label htmlFor="amount">Amount</label>
                  </div>
                  <div className="input-field col s5 m3">
                    <h5>= $666.69 USD</h5>
                  </div>
                </div>
                <div className="row formRow">
                  <div className="input-field col s12 m6">
                    <i className="material-icons prefix">present_to_all</i>
                    <select className="icons" id="crypto">
                      <option value="" className="disabled selected">Choose Your Token</option>
                      <option value="APPC" data-icon="images/appcoins.png" className="left">AppCoins
                        (APPC)
                      </option>
                      <option value="EOS" data-icon="images/eos.png" className="left">EOS (EOS)
                      </option>
                      <option value="LRC" data-icon="images/loopring.png" className="left">Loopring
                        (LRC)
                      </option>
                      <option value="SNOV" data-icon="images/snovio.png" className="left">Snovio
                        (SNOV)
                      </option>
                      <option value="WETH" data-icon="images/weth.png" className="left">WETH
                        (WETH)
                      </option>
                    </select>
                  </div>
                  <div className="input-field col s12 m5">
                    <i className="material-icons prefix">textsms</i>
                    <input type="text" id="autocomplete-input" className="autocomplete"/>
                    <label htmlFor="autocomplete-input">Ticker Lookup</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    //     <h4>Contract Address </h4>
    //     <input
    //       value={this.state.contractAddress}
    //       id="contractAddressInput"
    //       type="text"
    //       name="contractAddress"
    //       onChange={event => this.setState({contractAddress: event.target.value})}
    //     />
    //     <h4>Contract Symbol </h4>
    //     <input
    //       value={this.state.contractSymbol}
    //       id="contractSymbolInput"
    //       type="text"
    //       name="contractSymbol"
    //       onChange={event => this.setState({contractSymbol: event.target.value})}
    //     />
    //     <button onClick={() => this.addNewToken()}>Add New Token</button>
    //   </div>
    // );
  }

  sendTransaction() {

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
    this.setStatePropertiesFromKeystore(keystore);
    this.props.goMainState();
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
        this.setStatePropertiesFromKeystore(keystore);
        this.props.goMainState();
      } else {
        alert('password entered incorrectly');
      }
    };
    reader.readAsText(fileObject);
  }

  setStatePropertiesFromKeystore(keystore) {
    const publicKey = keystore.address;
    this.props.web3.eth.getBalance(publicKey).then(balance => {
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
    setPrivateKey: (privateKey) => dispatch({type: actionTypes.SET_PRIVATE_KEY, payload: privateKey}),
    setPublicKey: (publicKey) => dispatch({type: actionTypes.SET_PUBLIC_KEY, payload: publicKey}),
    setAccountBalance: (accountBalance) => dispatch({type: actionTypes.SET_ACCOUNT_BALANCE, payload: accountBalance}),
    setSignTransactionFunction: (signTransactionFunction) => dispatch({type: actionTypes.SET_SIGN_TRANSACTION_FUNCTION, payload: signTransactionFunction})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
