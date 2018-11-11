// React
import React, { Component } from 'react';

// Assets
import './App.css';
import logo from './logo.svg';

// Documentation API
import { getDocumentationFromApi } from './services/getDocumentationFromApi.js';
import { sidebarFromDocumentation } from './services/extractSidebarFromDocumentation.js';

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
      const documentationCategories = sidebarFromDocumentation(documentation).categories;
      
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
            <div className="row">
              <div className="col-sm-2 sidebarNav">
                <ul>
                  <li>
                    <a href="#">Introduction</a>
                  </li>
                  <li>
                    <a href="#">Docs</a>
                    <ul>
                    {documentationCategories.map(documentationCategory => (
                      <li>
                        <a href={documentationCategory.categoryUrl}>{documentationCategory.categoryName}</a>
                      </li>
                    ))}
                    </ul>
                  </li>
                  <li>
                    <a href="https://github.com/spotify/web-api/issues" target="_blank" rel="nofollow" alt="Developer Support on GitHub">Support</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-10">
                
              {documentation.endpoints.map(endpoint => (
                <p>{JSON.stringify(endpoint)}</p>
              ))}
                
              </div>
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
