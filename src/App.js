import React, { Component, Fragment } from 'react';

import './App.css';
import logo from './logo.svg';

export default class App extends Component {  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="visually-hidden">Spotify for Developers</span>
        </header>
        <div className="secondaryNav secondaryNav-webApi">
          <h3>Web API Reference <span className="beta">alpha</span></h3>
        </div>
      
        <main>
          <h3>Loading ...</h3>
        </main>

        <footer className="App-footer">
          <p>&copy; 2018 Spotify AB</p>
        </footer>
      </div>
    );
  }
};
