import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import Wallet from './containers/wallet';
import CreateKeystore from './containers/create-keystore';
import UploadKeystore from './containers/upload-keystore';

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

  render() {
    if (this.props.screen === 0) {
      return (
        <CreateKeystore />
      );
    } else if (this.props.screen === 1) {
      return (
        <UploadKeystore />
      );
    } else {
      return (
        <Wallet />
      );
    }
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



export default connect(mapStateToProps)(App);
