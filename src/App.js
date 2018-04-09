import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import Wallet from './containers/wallet';
import CreateKeystore from './containers/create-keystore';
import UploadKeystore from './containers/upload-keystore';
import * as states from './store/constants/states';

class App extends Component {

  render() {
    if (this.props.screen === states.CREATION_STATE) {
      return (
        <CreateKeystore />
      );
    } else if (this.props.screen === states.UPLOAD_STATE) {
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
    screen: state.screen,
  };
};



export default connect(mapStateToProps)(App);
