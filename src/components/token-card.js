import React from 'react';

import { connect } from 'react-redux';

class TokenCard extends React.Component {
  render() {
    return (
      <div value={this.props.symbol}
           className="col s3 m1 coinInactive">
        <img className="logo circle" src={this.props.image}/>
        <p
          className="center-align description">{this.props.name}
          ({this.props.symbol})</p>
        <p className="center-align">
          <strong>{this.props.balance}</strong>
        </p>
      </div>
    )
  }
}

export default TokenCard;
