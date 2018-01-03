import React, { Component } from 'react';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import AuthorizeScreen from './screens/Authorize.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Header />
      
        <main>
          <AuthorizeScreen />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
