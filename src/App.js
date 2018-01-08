import React, { Component, Fragment } from 'react';
import WebPlaybackReact from './Spotify/WebPlaybackReact.js';

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
    userDeviceId: null,
    userAccessToken: null,

    // Player state
    playerLoaded: false,
    playerSelected: false,
    playerState: null
  }

  componentWillMount() {
    LoginCallback({
      onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
      onAccessTokenExpiration: this.onAccessTokenExpiration.bind(this)
    });
  }
  
  onSuccessfulAuthorization(accessToken) {
    this.setState({
      userAccessToken: accessToken
    });
  }
  
  onAccessTokenExpiration() {
    this.setState({
      userDeviceId: null,
      userAccessToken: null,
      playerLoaded: false,
      playerSelected: false,
      playerState: null
    });

    console.error("The user access token has expired.");
  }
  
  render() {
    let {
      userDeviceId,
      userAccessToken,
      playerLoaded,
      playerSelected,
      playerState
    } = this.state;
    
    let webPlaybackSdkProps = {
      playerName: "Spotify React Player",
      playerInitialVolume: 1.0,
      playerRefreshRateMs: 100,
      playerAutoConnect: true,
      userAccessToken: userAccessToken,
      onPlayerLoading: (() => this.setState({ playerLoaded: true })),
      onPlayerWaitingForDevice: (data => this.setState({ playerSelected: false, userDeviceId: data.device_id })),
      onPlayerDeviceSelected: (() => this.setState({ playerSelected: true })),
      onPlayerStateChange: (playerState => this.setState({ playerState: playerState })),
      onPlayerError: (playerError => console.error(playerError))
    };
    
    return (
      <div className="App">
        <Header />
      
        <main>
          {!userAccessToken && <IntroScreen />}
          {userAccessToken &&
            <WebPlaybackReact {...webPlaybackSdkProps}>
              {!playerLoaded &&
                <h2 className="action-orange">Loading Player</h2>
              }

              {playerLoaded && !playerSelected && 
                <Fragment>
                  <h2 className="action-green">Loading Player</h2>
                  <h2 className="action-orange">Waiting for device to be selected</h2>
                </Fragment>
              }

              {playerLoaded && playerSelected && !playerState &&
                <Fragment>
                  <h2 className="action-green">Loading Player</h2>
                  <h2 className="action-green">Waiting for device to be selected</h2>
                  <h2 className="action-orange">Start playing music ...</h2>
                </Fragment>
              }

              {playerLoaded && playerSelected && playerState &&
                <Fragment>
                  <h2 className="action-green">Loading Player</h2>
                  <h2 className="action-green">Waiting for device to be selected</h2>
                  <h2 className="action-green">Start playing music!</h2>
                  <NowPlayingScreen playerState={playerState} />
                </Fragment>
              }
            </WebPlaybackReact>
          }
        </main>

        <Footer />
      </div>
    );
  }
};
