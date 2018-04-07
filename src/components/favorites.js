import React from 'react';

class Favorites extends React.Component {

  render() {
    return this.props.favoritesArray.map((favorites) => {
      return (
        <li className="collection-item hack" style={{backgroundColor: favorites.color}}>
          <div className="friend hack" style={{backgroundColor: favorites.color}}>
            <div>
              <div className="right-align col s12 editbutton"><a className="btn-floating btn-small" ><i className="material-icons hackbutton" style={{color: favorites.color}} >mode_edit</i></a></div>
              <div className="center-align">
                <div className="center-align"><i className="center-align medium material-icons" style={{color: '#fff'}}>insert_chart</i></div>
                <div className="key-container"><p className="truncate key-style">{favorites.publicID}</p></div>
                <div><a className="waves-effect waves-light btn hackbutton" style={{color: favorites.color}}>Pay Me</a></div>
              </div>
            </div>
          </div>
        </li>

      );
    });
  }
}

export default Favorites;
