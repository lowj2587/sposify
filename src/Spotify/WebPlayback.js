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
    this.webPlaybackInstance = new Spotify.Player({
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
      if (this.props.onPlayerReady) this.props.onPlayerReady(data);
    });

    if (this.props.playerAutoConnect) {
      this.webPlaybackInstance.connect();
    }
  }

  componentWillMount() {
    this.props.onPlayerLoading();
    await this.waitForSpotify();
    this.setupWebPlaybackEvents();
    this.props.onPlayerWaitingForDevice();
    await this.waitForDeviceToBeSelected();
    this.props.onPlayerDeviceSelected();
  }

  render() {
    
  }
};