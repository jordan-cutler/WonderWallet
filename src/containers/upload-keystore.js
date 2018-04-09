import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/constants/actions';
import Wally from '../assets/walrus.png';
import * as tokenUtilities from '../util/token-utilities';
import * as stateUtilities from '../util/state-utilities';

class UploadKeystore extends React.Component {
  state = {
    passwordForUploadedKeystore: '',
    keyStoreFileUploaded: null,
  };

  render() {
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
  }

  uploadKeystore(fileObject, password) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = JSON.parse(e.target.result);
      const json = {
        ...parsed,
        crypto: parsed.Crypto || parsed.crypto
      }; // since for some reason myetherwallet downloads have the json crypto attribute start with a capital C
      const keystore = this.props.web3.eth.accounts.decrypt(json, password);
      if (keystore) {
        stateUtilities.setStatePropertiesFromKeystoreThenGoToMainState(keystore);
        tokenUtilities.updateTokenBalances(keystore.address, this.props.tokens.slice(1));
      } else {
        alert('password entered incorrectly');
      }
    };
    reader.readAsText(fileObject);
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    screen: state.screen,
    tokens: state.tokens,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goInitialState: () => dispatch({type: actionTypes.SET_INITIAL_STATE}),
    goCreationState: () => dispatch({type: actionTypes.SET_CREATION_STATE}),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UploadKeystore);
