import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
const VITALIK_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
class App extends Component {

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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href={new Blob([keystore, {type : 'application/json'}])}
           download={this.generateFileName(acc.address)}
        >
          Download keystore
        </a>
        <input type="file" name="keystoreInput" onChange={(event) => this.fileUploaded(event)} />
        <h1>Sep</h1>
        <input type="file" name="keystoreInput" onChange={(event) => this.imageUploaded(event)} />
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

  fileUploaded(event) {
    const file = event.target.files[0];
    console.log(file);
    const keystore = this.props.web3.eth.accounts.decrypt(file, "testabc");
    console.log(keystore);
    console.log('file uploaded');
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3
  }
};

export default connect(mapStateToProps)(App);
