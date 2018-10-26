import React, { Component, Fragment } from 'react';

import './App.css';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

export default class App extends Component {  
  render() {
    return (
      <div className="App">
        <Header />
      
        <main>
          <h3>Loading ...</h3>
        </main>

        <Footer />
      </div>
    );
  }
};
