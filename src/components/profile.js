import React from 'react';

import { connect } from 'react-redux';

class Profile extends React.Component {
  render() {
    return (
      <div className="row col s12">
        <div className="col s12 m7">
          <h5>Public Key:{this.props.publicKey}</h5>
          <h6>{this.props.accountBalance}</h6>
        </div>
      </div>
    );
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

export default connect(mapStateToProps)(Profile);
