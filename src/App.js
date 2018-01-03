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
  
  onSuccessfulAuthorization(accessToken) {
    this.setState({
      accessToken: accessToken
    });
  }
  
  onAccessTokenExpiration() {
    this.setState({
      deviceId: null,
      accessToken: null,
      playerLoaded: false,
      playerSelected: false,
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
    
    let webPlaybackSdkProps = {
      playerName: "Bilawal's React Player",
      playerInitialVolume: 1.0,
      playerAutoConnect: true,
      userAccessToken: accessToken,
      onPlayerLoading: (() => this.setState({ playerLoaded: true })),
      onPlayerWaitingForDevice: (data => this.setState({ deviceId: data.device_id })),
      onPlayerDeviceSelected: (() => this.setState({ playerSelected: true })),
      onPlayerStateChange: (playerState => this.setState({ playerState: playerState })),
      onPlayerError: (playerError => console.error(playerError))
    };
    
    return (
      <div className="App">
        <Header />
      
        <main>
          {!accessToken && <IntroScreen />}
          {accessToken && <WebPlayback {...webPlaybackSdkProps} />}
          
          {accessToken && !playerLoaded &&
            <div>
              <h2 className="action-orange">Loading Player</h2>
            </div>
          }

          {accessToken && playerLoaded && !playerSelected && 
            <div>
              <h2 className="action-green">Loading Player</h2>
              <h2 className="action-orange">Waiting for device to be selected</h2>
            </div>
          }

          {accessToken && playerLoaded && playerSelected &&
            <div>
              <h2 className="action-green">Loading Player</h2>
              <h2 className="action-green">Waiting for device to be selected</h2>
              <h2 className="action-green">Start playing music!</h2>
              <NowPlayingScreen playerState={playerState} />
            </div>
          }
        </main>

        <Footer />
      </div>
    );
  }
};
