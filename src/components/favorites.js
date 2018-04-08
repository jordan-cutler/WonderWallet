import React from 'react';

import { connect } from 'react-redux';

class Favorites extends React.Component {
  render() {
    return this.props.favoritesArray.map((favorites) => {
      return (
        <div key={favorites.publicID} className="col s6 friendGroup" style={{color: favorites.color, borderColor: favorites.color}}>
        	<i className="large material-icons" style={{color: favorites.color}}>{favorites.icon}</i>
        	<p className="truncate publicKey">{favorites.publicID}</p>
        	<a onClick={() => this.setState({recipientAddress: favorites.publicID})} className="waves-effect btn-flat valign-wrapper friendButton">Pay Me</a>
        </div>
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    favoritesArray: state.favorites
  };
};

export default connect(mapStateToProps)(Favorites);
