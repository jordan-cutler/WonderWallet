import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import Favorites from './components/favorites.js'
import Profile from './components/profile.js'
import * as actionTypes from './store/actions';
const VITALIK_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';

const Userr = {
  currentBalance: 6900,
  publicKey: "01234567890123456789012345678901234567890123456789"
};

class App extends Component {
  state = {
    contractAddress: '',
    contractSymbol: ''
  };

  render() {
    const acc = this.props.web3.eth.accounts.create();
    console.log(acc);
    console.log(this.props.web3.eth.accounts.create('hello'));
    const vitalikAccountBalance = this.props.web3.eth.getBalance(VITALIK_ADDRESS);
    vitalikAccountBalance.then(console.log);
    const password = "testabc";
    const keystore = this.props.web3.eth.accounts.encrypt(acc.privateKey, password);
    console.log(keystore);
    const decrypted = this.props.web3.eth.accounts.decrypt(keystore, password);
    console.log('decrypted',decrypted);
    // if(this.props.screen === 0) {
    //   return (
    //     <div>
    //       <h1>Upload your keystore</h1>
    //       <input type="file" id="myFile"></input>
    //       <input type="password" name="psw"></input>
    //       <button onClick={this.props.goMainState}>Submit</button>
    //       <p onClick={this.props.goCreationState}>Create A Keystore</p>
    //     </div>
    //   );
    // } else if(this.props.screen === 1) {
    //   return (
    //     <div>
    //       <h1>Create a keystore</h1>
    //       <input type="password" name="psw"></input>
    //       <button onClick={this.props.goMainState}>Create Keystore</button>
    //       <p onClick={this.props.goInitialState}>Upload A Keystore</p>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div>
    //       <div className="row topRow center-align">
    //         <div className="wonder center-align">W&#0246;nderWallet</div>
    //         <div className="tagline center-align">It is time to blockchain human again</div>
    //         <button onClick={this.props.goInitialState}>Sign Out</button>
    //       </div>
    //       <div className="row bottomRow">
    //
    //         <hr className="divider"></hr>
    //         <ul className="collection with-header col s12 m4 center-align sideBar">
    //           <li className="collection-header"><h4>Favorites</h4></li>
    //           <Favorites favoritesArray={this.props.favorites}/>
    //         </ul>
    //         <Profile user={Userr}/>
    //         <div className="row col s12 m8">
    //           <hr></hr>
    //           <h4>Make a Payment:</h4>
    //           <form className="col s12">
    //             <div className="row formRow">
    //               <div className="input-field col s12 m11">
    //                 <i className="material-icons prefix">face</i>
    //                 <textarea id="receiver" className="materialize-textarea"></textarea>
    //                 <label for="receiver">Receiver Public Key</label>
    //               </div>
    //             </div>
    //             <div className="row formRow">
    //               <div className="input-field col s7 m8">
    //                 <i className="material-icons prefix">local_atm</i>
    //                 <textarea id="amount" className="materialize-textarea"></textarea>
    //                 <label for="amount">Amount</label>
    //               </div>
    //               <div className="input-field col s5 m3">
    //                 <h5>= $666.69 USD</h5>
    //               </div>
    //             </div>
    //             <div className="row formRow">
    //               <div className="input-field col s12 m6">
    //                 <i className="material-icons prefix">present_to_all</i>
    //                 <select className="icons" id="crypto">
    //                   <option value="" className="disabled selected">Choose Your Token</option>
    //                   <option value="APPC" data-icon="images/appcoins.png" className="left">AppCoins
    //                     (APPC)
    //                   </option>
    //                   <option value="EOS" data-icon="images/eos.png" className="left">EOS (EOS)
    //                   </option>
    //                   <option value="LRC" data-icon="images/loopring.png" className="left">Loopring
    //                     (LRC)
    //                   </option>
    //                   <option value="SNOV" data-icon="images/snovio.png" className="left">Snovio
    //                     (SNOV)
    //                   </option>
    //                   <option value="WETH" data-icon="images/weth.png" className="left">WETH
    //                     (WETH)
    //                   </option>
    //                 </select>
    //               </div>
    //               <div className="input-field col s12 m5">
    //                 <i className="material-icons prefix">textsms</i>
    //                 <input type="text" id="autocomplete-input" className="autocomplete"></input>
    //                 <label for="autocomplete-input">Ticker Lookup</label>
    //               </div>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    console.log('stringified', JSON.stringify(keystore));
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href={URL.createObjectURL(new Blob([JSON.stringify(keystore), {type: 'text/plain'}]))}
        download={this.generateFileName(acc.address)}
        >
        Download keystore
        </a>
        <input type="file" name="keystoreInput" onChange={(event) => this.fileUploaded(event)}/>
        <h1>Sep</h1>
        <input type="file" name="keystoreInput" onChange={(event) => this.imageUploaded(event)}/>
        <h4>Contract Address </h4>
        <input
          value={this.state.contractAddress}
          id="contractAddressInput"
          type="text"
          name="contractAddress"
          onChange={event => this.setState({contractAddress: event.target.value})}
        />
        <h4>Contract Symbol </h4>
        <input
          value={this.state.contractSymbol}
          id="contractSymbolInput"
          type="text"
          name="contractSymbol"
          onChange={event => this.setState({contractSymbol: event.target.value})}
        />
        <button onClick={() => this.addNewToken()}>Add New Token</button>
      </div>
    );
  }

  generateFileName(publicKey) {
    const today = new Date();
    return `UTC--${today}-${publicKey}.json`;
  }

  imageUploaded(event) {
    console.log(event.target.files[0]);
  }

  addNewToken() {
    console.log(this.state.contractAddress);
    console.log(this.state.contractSymbol);
    const address = '0xBDC5bAC39Dbe132B1E030e898aE3830017D7d969';
    const contract = this.getERC20Contract(address);
    console.log(contract);
    contract.methods.name().call().then((name) => {
      console.log('made it in');
      console.log(name);
    });
    contract.methods.decimals().call().then((name) => {
      console.log('made it in');
      console.log(name);
    });
    contract.methods.totalSupply().call().then((name) => {
      console.log('made it in');
      console.log(name);
    });
    console.log('hello');
    // contract.methods.name().send({
    //   from: '0x734B7e03144742156E18f8224e2338Bb95b99f89'
    // }).on('transactionHash', function(hash) {
    //     console.log(hash);
    //   })
    //   .on('confirmation', function(confirmationNumber, receipt) {
    //     console.log(confirmationNumber);
    //     console.log(receipt);
    //   })
    //   .on('receipt', function(receipt) {
    //     console.log(receipt);
    //   })
    //   .on('error', function(error) {
    //     console.log('err', error);
    //   });
    this.verifyERC20(address, 'SNOV').then(console.log)
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
        console.log(symbolResponse);
        console.log(symbol);
        return symbolResponse === symbol;
      }).catch(e => {
        return false;
      });
  }

  fileUploaded(event) {
    console.log('made it into file uploaded');
    const fileObject = event.target.files[0];
    const encryptedKeystore = {
      'lastModified': fileObject.lastModified,
      'lastModifiedDate': fileObject.lastModifiedDate,
      'name': fileObject.name,
      'size': fileObject.size,
      'type': fileObject.type
    };
    console.log(encryptedKeystore);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('break1');
      console.log(e.target.result);
      console.log('break2');
      console.log(JSON.stringify(e.target.result));
      console.log(e.target.result.substring(0, e.target.result.length - 15));
      const keystore = this.props.web3.eth.accounts.decrypt(JSON.parse(e.target.result.substring(0, e.target.result.length - 15)), 'testabc');
      console.log(keystore);
    };
    reader.readAsText(fileObject);

    //console.log(keystore);
    console.log('file uploaded');
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    screen: state.screen,
    favorites: state.favorites
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goInitialState: () => dispatch({type: actionTypes.SET_INITIAL_STATE}),
    goCreationState: () => dispatch({type: actionTypes.SET_CREATION_STATE}),
    goMainState: () => dispatch({type: actionTypes.SET_MAIN_STATE})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
