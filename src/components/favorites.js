import React from 'react';

import { connect } from 'react-redux';

class Favorites extends React.Component {
  render() {
    return this.props.favoritesArray.map((favorites) => {
      return (
          <div style={{color: favorites.color}}>
              <div className="row">
                <div className="col s12">
                  <i className="center-align large material-icons" style={{color: favorites.color}}>insert_chart</i>
                  <p>{favorites.publicID}</p>
                  <a className="waves-effect btn-flat" style={{color: favorites.color}}>Pay Me</a>
                </div>
              </div>
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
