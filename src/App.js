import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    console.log(this.props.web3.eth.accounts.create());
    console.log(this.props.web3.eth.accounts.create('hello'));
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    web3: state.web3
  }
};

export default connect(mapStateToProps)(App);
