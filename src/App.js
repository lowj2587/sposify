import React, { Component } from 'react';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import LoginCallback from './Spotify/LoginCallback.js';
import IntroScreen from './screens/Intro.js';
import './App.css';

window.onSpotifyWebPlaybackSDKReady = () => {};

export default class App extends Component {
  componentWillMount() {
    LoginCallback(this.onAccessTokenExpiration);
  }
  
  onAccessTokenExpiration() {
    console.log("The access token has expired.");
  }
  
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
