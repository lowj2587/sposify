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
    deviceId: null,
    accessToken: null,
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
    return (
      <div className="App">
        <Header />
      
        <main>
          {!this.state.accessToken && <IntroScreen />}
          {this.state.accessToken &&
            <WebPlayback
              playerName="Bilawal's React Player"
              playerInitialVolume={1.0}
              playerAutoConnect={true}
              userAccessToken={this.state.accessToken}
              onPlayerLoading={() => console.log("loaded")}
              onPlayerWaitingForDevice={data => this.setState({ deviceId: data.device_id })}
              onPlayerDeviceSelected={() => console.log("device selected")}
              onPlayerStateChange={playerState => this.setState({ playerState: playerState })}
              onPlayerError={playerError => console.log(playerError)} />
          }
        </main>

        <Footer />
      </div>
    );
  }
};
