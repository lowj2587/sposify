// React
import React, { Component } from 'react';

// Assets
import './App.css';
import logo from './logo.svg';

// Documentation API
import { getDocumentationFromApi } from './services/getDocumentationFromApi.js';
import { extractSidebarFromDocumentation } from './services/extractSidebarFromDocumentation.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      status: 'loading',
      documentation: null,
      documentationCategories: null
    };
    
    this.releaseVersion = 'beta-0.0.1';
  }
  
  componentWillMount() {
    getDocumentationFromApi().then(documentation => {
      const documentationCategories = extractSidebarFromDocumentation(documentation);
      
      this.setState({ status: 'loaded', documentation, documentationCategories });      
    }).catch(err => {
      console.error({ err });
      this.setState({ status: 'error' });
    });
  }
  
  render() {
    const { status, documentation, documentationCategories } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="visually-hidden">Spotify for Developers</span>
        </header>
        <div className="secondaryNav secondaryNav-webApi">
          <h1>Web API Reference <span className="version">{this.releaseVersion}</span></h1>
        </div>
      
        <main>
          {status === 'loading' && <h3>Loading ...</h3>}
          {status === 'error' && <h3>An unexpected error occurred. Refresh!</h3>}
          {status === 'loaded' && <div className="container-fluid">
            <div className="col-sm-3">
              {JSON.stringify(documentationCategories)}
            </div>
            <div className="col-sm-9">
              <h3>Hello world</h3>
            </div>
          </div>}
        </main>

        <footer className="App-footer" aria-hidden="true">
          <p>&copy; 2018 Spotify AB</p>
        </footer>
      </div>
    );
  }
};
