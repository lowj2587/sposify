import React, { Component } from 'react';

export default class WebPlayback extends Component {
  interval = null

  state = {
    playerReady: false,
    playerSelected: false
  }

  // onPlayerLoading
  // onPlayerWaitingForDevice
  // onPlayerDeviceSelected
  // onPlayerStateChange
  // onPlayerError

  waitForSpotify() {
    if (window.Spotify) {
      this.props.onPlayerWaitingForDevice();
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.props.onPlayerWaitingForDevice();
      };
    }    
  }

  componentWillMount() {
    this.props.onPlayerLoading();
    this.waitForSpotify();
    this.waitForDeviceSele
  }
};