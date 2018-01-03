import React, { Component } from 'react';

import Header from './layout/Header.js';
import HeaderProduct from './layout/HeaderProduct.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HeaderProduct />
        <main>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </main>
      </div>
    );
  }
}

export default App;
