import React from 'react';
import * as actionTypes from '../store/constants/actions';
import classNames from 'classnames';
import WalrusImage from '../assets/walrus.png';

import { connect } from 'react-redux';

class NewTokenCard extends React.Component {
  render() {
    return (
      <div value={this.props.symbol}
           className={classNames({
             "col m2": true,
             "coinInactive": !this.props.currentlySelectedToken || (this.props.currentlySelectedToken.symbol !== this.props.token.symbol),
             "coinActive": this.props.currentlySelectedToken && this.props.currentlySelectedToken.symbol === this.props.token.symbol
           })}
           onClick={() => this.props.setCurrentlySelectedToken(this.props.token)}
      >
        <img className="logoSpec circle" src={WalrusImage}/>
        <p className="center-align description">
          ({this.props.symbol})
        </p>
        <p className="center-align">
          {this.props.balance.toString()}
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentlySelectedToken: state.currentlySelectedToken
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentlySelectedToken: (token) => dispatch({type: actionTypes.UPDATE_CURRENTLY_SELECTED_TOKEN, payload: token})
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(NewTokenCard);
