import React, { Component } from 'react';

import Header from './layout/Header.js';
import HeaderProduct from './layout/HeaderProduct.js';
import Footer from './layout/Footer.js';

import AuthorizeScreen from './screens/Authorize.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HeaderProduct />
      
        <main className="container">
          <AuthorizeScreen />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
