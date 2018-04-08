import React from 'react';

class Favorites extends React.Component {

  render() {
    return this.props.favoritesArray.map((favorites) => {
      return (
        <li class="collection-item friend hack1"  style={{backgroundColor: favorites.color}}>
          <div class="hack1" style={{backgroundColor: favorites.color}}>
            <div>
              <div class="right-align col s12 editbutton"><a class="btn-floating btn-small hackbutton1"><i class="material-icons hackbutton1">mode_edit</i></a></div>
              <div class="center-align row">
                <div class="col s4">
                  <i class="center-align large material-icons" style={{color: '#fff'}} style={{color: favorites.color}}>insert_chart</i>
                </div>
                <div class="col s6">
                  <p>{favorites.publicID}</p>
                  <a class="waves-effect waves-light btn hackbutton1" style={{color: favorites.color}}>Pay Me</a>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    });
  }
}

export default Favorites;
