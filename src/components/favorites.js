import React from 'react';

import { connect } from 'react-redux';

class Favorites extends React.Component {
  render() {
    return this.props.favoritesArray.map((favorites) => {
      return (
        <div key={favorites.publicID} className="col s6 friendGroup" style={{color: favorites.color, borderColor: favorites.color}}>
        	<i className="large material-icons" style={{color: favorites.color}}>hourglass_empty</i>
        	<p className="truncate publicKey">0xd8F4d1493ec3b76674856b4c01dF4d337B3df97D</p>
        	<a className="waves-effect btn-flat valign-wrapper friendButton">Pay Me</a>
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
