import React, { Component } from 'react';

import './App.css';
import logo from './logo.svg';

import { getDocumentationFromApi } from './services/DocumentationAPI.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      status: 'loading',
      documentation: null
    };
  }
  
  componentWillMount() {
    getDocumentationFromApi().then(documentation => {
      this.setState({ status: 'loaded', documentation });
    }).catch(err => {
      console.error({ err });
      this.setState({ status: 'error' });
    });
  }
  
  render() {
    const { status, documentation } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="visually-hidden">Spotify for Developers</span>
        </header>
        <div className="secondaryNav secondaryNav-webApi">
          <h1>Web API Reference <span className="version">BETA.0.0.1</span></h1>
        </div>
      
        <main>
          {status === 'loading' && <h3>Loading ...</h3>}
          {status === 'error' && <h3>An unexpected error occurred. Refresh!</h3>}
          {status === 'loaded' && <h3>Loaded. {JSON.stringify(documentation)}</h3>}
        </main>

        <footer className="App-footer">
          <p>&copy; 2018 Spotify AB</p>
        </footer>
      </div>
    );
  }
};
