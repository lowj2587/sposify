import React, { Component } from 'react';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import IntroScreen from './screens/Intro.js';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      
        <main>
          <IntroScreen />
        </main>

        <Footer />
      </div>
    );
  }
};
