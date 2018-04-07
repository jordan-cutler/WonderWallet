import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

const VITALIK_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';

class App extends Component {
  state = {
    contractAddress: '',
    contractSymbol: ''
  };

  render() {
    // const acc = this.props.web3.eth.accounts.create();
    // console.log(acc);
    // console.log(this.props.web3.eth.accounts.create('hello'));
    // const vitalikAccountBalance = this.props.web3.eth.getBalance(VITALIK_ADDRESS);
    // vitalikAccountBalance.then(console.log);
    // const password = "testabc";
    // const keystore = this.props.web3.eth.accounts.encrypt(acc.privateKey, password);
    // console.log(keystore);
    // const decrypted = this.props.web3.eth.accounts.decrypt(keystore, password);
    // console.log('decrypted',decrypted);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/*<a href={JSON.stringify(keystore)}*/}
        {/*download={this.generateFileName(acc.address)}*/}
        {/*>*/}
        {/*Download keystore*/}
        {/*</a>*/}
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
    this.verifyERC20(address, 'SNOV', 18).then(console.log)
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
        console.log(symbolResponse == symbol);
        return symbolResponse == symbol;
      }).catch(e => {
        return false;
      });

    // return contract.methods.decimals().call()
    //   .then((decimalsResponse) => {
    //   console.log(decimalsResponse);
    //   console.log(decimals);
    //     if (decimalsResponse != decimals) {
    //       return false;
    //     }
    //
    //   })
    //   .catch(e => {
    //     return false;
    //   });

  }

  fileUploaded(event) {
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
      const keystore = this.props.web3.eth.accounts.decrypt(JSON.stringify(e.target.result), 'testabc');
    };
    reader.readAsText(new Blob([JSON.stringify(encryptedKeystore), {type: 'application/json'}]));

    //console.log(keystore);
    console.log('file uploaded');
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3
  };
};

export default connect(mapStateToProps)(App);
