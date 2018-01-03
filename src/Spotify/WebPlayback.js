import React, { Component } from 'react';

export default class WebPlayback extends Component {
  deviceSelectedInterval = null
  webPlaybackInstance = null

  state = {
    playerReady: false,
    playerSelected: false
  }

  waitForSpotify() {
    return new Promise(resolve => {
      if ('Spotify' in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => { resolve(); };
      }
    });
  }

  waitForDeviceToBeSelected() {
    return new Promise(resolve => {
      this.deviceSelectedInterval = setInterval(() => {
        if (this.webPlaybackInstance) {
          this.webPlaybackInstance.getCurrentState().then(state => {
            if (state !== null) {
              clearInterval(this.deviceSelectedInterval);
              resolve(state);
            }
          });
        }
      });
    });
  }

  setupWebPlaybackEvents() {
    let { Player } = window.Spotify;

    this.webPlaybackInstance = new Player({
      name: this.props.playerName,
      volume: this.props.playerInitialVolume,
      getOAuthToken: callback => { callback(this.props.userAccessToken); }
    });
    
    this.webPlaybackInstance.on("initialization_error", e => {
      this.props.onPlayerError(e.message);
    });
    
    this.webPlaybackInstance.on("authentication_error", e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on("account_error", e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on("playback_error", e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on("player_state_changed", state => {
      this.props.onPlayerStateChange(state);
    });

    this.webPlaybackInstance.on("ready", data => {
      this.props.onPlayerWaitingForDevice(data);
    });

    if (this.props.playerAutoConnect) {
      this.webPlaybackInstance.connect();
    }
  }

  setupWaitingForDevice() {
    this.webPlaybackInstance.on("ready", data => {
      this.props.onPlayerWaitingForDevice(data);
    });
  }

  async componentWillMount() {
    this.props.onPlayerLoading();
    await this.waitForSpotify();
    this.setupWebPlaybackEvents();
    await this.waitForDeviceToBeSelected();
    this.props.onPlayerDeviceSelected();
  }

  render() {
    return (<h1>Hi world</h1>);
  }
};