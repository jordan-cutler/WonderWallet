import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/constants/actions';
import Wally from '../assets/walrus.png';
import * as tokenUtilities from '../util/token-utilities';
import * as stateUtilities from '../util/state-utilities';

class CreateKeystore extends React.Component {
  state = {
    passwordForNewKeystore: '',
  };

  render() {
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
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(keystore)));
    element.setAttribute('download', CreateKeystore.generateFileName(acc.address));
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    stateUtilities.setStatePropertiesFromKeystoreThenGoToMainState(keystore);
    tokenUtilities.updateTokenBalances(keystore.address, this.props.tokens.slice(1));
  }

  static generateFileName(publicKey) {
    const today = new Date();
    return `UTC--${today}-${publicKey}.json`;
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    screen: state.screen,
    privateKey: state.privateKey,
    tokens: state.tokens,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goInitialState: () => dispatch({type: actionTypes.SET_INITIAL_STATE}),
    goCreationState: () => dispatch({type: actionTypes.SET_CREATION_STATE}),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateKeystore);
