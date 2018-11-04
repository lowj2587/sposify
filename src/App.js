// React
import React, { Component } from 'react';

// React Router
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

// Assets
import './App.css';
import logo from './logo.svg';

// Documentation API
import { getDocumentationFromApi } from './services/getDocumentationFromApi.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      status: 'loading',
      documentation: null
    };
    
    this.releaseVersion = 'beta-0.0.1';
    this.sidebarItems = [
      {
        path: "/docs",
        render: () => <h1>/docs</h1>,
      },
      {
        path: "/docs/endpoints/:endpoint",
        render: () => <h1>/docs/endpoints/:endpoint</h1>,
      },
      {
        path: "/docs/endpoints/:endpoint/objects",
        render: () => <h1>/docs/endpoints/:endpoint/objects</h1>,
      }
    ];
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
          <h1>Web API Reference <span className="version">{this.releaseVersion}</span></h1>
        </div>
      
        <main>
          {status === 'loading' && <h3>Loading ...</h3>}
          {status === 'error' && <h3>An unexpected error occurred. Refresh!</h3>}
          {status === 'loaded' && <Switch>
            {this.sidebarItems.map(sidebarItem => (<Route exact {...sidebarItem} />))}
            <Redirect from="/" to="/docs" />
          </Switch>}
        </main>

        <footer className="App-footer">
          <p>&copy; 2018 Spotify AB</p>
        </footer>
      </div>
    );
  }
};
