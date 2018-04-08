import React from 'react';

import { connect } from 'react-redux';

class Favorites extends React.Component {
  render() {
    return this.props.favoritesArray.map((favorites) => {
      return (
        <li className="collection-item friend hack1"  style={{backgroundColor: favorites.color}}>
          <div className="hack1" style={{backgroundColor: favorites.color}}>
            <div>
              <div className="right-align col s12 editbutton"><a className="btn-floating btn-small hackbutton1"><i className="material-icons hackbutton1">mode_edit</i></a></div>
              <div className="center-align row">
                <div className="col s4">
                  <i className="center-align large material-icons" style={{color: favorites.color}}>insert_chart</i>
                </div>
                <div className="col s6">
                  <p>{favorites.publicID}</p>
                  <a className="waves-effect waves-light btn hackbutton1" style={{color: favorites.color}}>Pay Me</a>
                </div>
              </div>
            </div>
          </div>
        </li>
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
