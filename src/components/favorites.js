import React from 'react';

import { connect } from 'react-redux';

class Favorites extends React.Component {
  render() {
    return this.props.favorites.map((favorite) => {
      return (
        <div key={favorite.publicID} className="col s6 friendGroup" style={{color: favorite.color, borderColor: favorite.color}}>
        	<i className="large material-icons" style={{color: favorite.color}}>{favorite.icon}</i>
        	<p className="truncate publicKey">{favorite.publicID}</p>
        	<a onClick={() => document.getElementByID("receiver").value = favorite.publicID} className="waves-effect btn-flat valign-wrapper friendButton">Pay Me</a>
        </div>
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites
  };
};

export default connect(mapStateToProps)(Favorites);
