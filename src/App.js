import React, { Component } from 'react';
import WebPlayback from './Spotify/WebPlayback.js';

import './App.css';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import LoginCallback from './Spotify/LoginCallback.js';

import IntroScreen from './screens/Intro.js';
import NowPlayingScreen from './screens/NowPlaying.js';

window.onSpotifyWebPlaybackSDKReady = () => {};

export default class App extends Component {
  state = {
    // User's session credentials
    deviceId: null,
    accessToken: null,

    // Player state
    playerLoaded: false,
    playerSelected: false,
    playerState: null
  }

  componentWillMount() {
    LoginCallback(
      this.onSuccessfulAuthorization.bind(this),
      this.onAccessTokenExpiration.bind(this)
    );
  }
  
  onSuccessfulAuthorization(access_token) {
    this.setState({ accessToken: access_token });
  }
  
  onAccessTokenExpiration() {
    this.setState({
      deviceId: null,
      accessToken: null,
      playerState: null
    });
    console.error("The access token has expired.");
  }
  
  render() {
    let {
      deviceId,
      accessToken,
      playerLoaded,
      playerSelected,
      playerState
    } = this.state;
    
    return (
      <div className="App">
        <Header />
      
        <main>
          {!accessToken && <IntroScreen />}
          {accessToken &&
            <WebPlayback
              playerName="Bilawal's React Player"
              playerInitialVolume={1.0}
              playerAutoConnect={true}
              userAccessToken={accessToken}
              onPlayerLoading={() => this.setState({ playerLoaded: true })}
              onPlayerWaitingForDevice={data => this.setState({ deviceId: data.device_id })}
              onPlayerDeviceSelected={() => this.setState({ playerSelected: true })}
              onPlayerStateChange={playerState => this.setState({ playerState: playerState })}
              onPlayerError={playerError => console.error(playerError)}>
            
              {!playerLoaded && <h1>Loading Player</h1>}
              {!playerSelected && playerLoaded && <h1>Waiting for device to be selected</h1>}
              {playerSelected && playerLoaded &&
                 <h1>Now
              }
            </WebPlayback>
          }
        </main>

        <Footer />
      </div>
    );
  }
};
