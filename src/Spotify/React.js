import React, { Component } from 'react';

class WebPlaybackLoading extends Component {
  componentWillMount = () => {
    if (window.Spotify) {
      this.props.setLoadingState(true);
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.props.setLoadingState(true);
      };
    }
  }

  render = () => {
    return this.props.children;
  }
}

class WebPlaybackWaitingForDevice extends Component {

  componentWillMount = () => {
    if (!window.Spotify.PlayerInstance) {
      this.createSpotifyPlayerInstance();
    }
  }

  render = () => {
    return this.props.children;
  }
}

class WebPlayback extends Component {
  interval = null

  state = {
    loaded: false, // Has the player loaded?
    selected: false, // Has the player been selected?
    error: null // Has the player thrown an error?
  }

  setLoadingState = loadingState => {
    this.setState({ loaded: loadingState });

    if (!this.interval) {
      this.interval = setInterval(async () => {
        if (window.Spotify.PlayerInstance) {
          let state = await window.Spotify.PlayerInstance.getCurrentState();
          this.setState({ selected: (state !== null) });
          if (this.props.onPlayerStateChange) this.props.onPlayerStateChange(state);
        }
      }, 100);
    }
  };

  componentWillUnmount = () => {
    if (this.interval) clearInterval(this.interval);
  }

  childrenWithAddedProps = () => {
    return React.Children.map(this.props.children, child => {
      let child_type = child.props.state;

      switch (child_type) {
        case 'Error':
          return React.cloneElement(child, { errorMessage: this.state.error });
        case 'Loading':
          return (
            <WebPlaybackLoading state="Loading" setLoadingState={this.setLoadingState}>
              {child.props.children}
            </WebPlaybackLoading>
          );
        case 'WaitingForDevice':
          return (
            <WebPlaybackWaitingForDevice state="WaitingForDevice" {...this.props}>
              {child.props.children}
            </WebPlaybackWaitingForDevice>
          );
        case 'Player':
          // TODO: Send state as a props for better developer UX
          return child;
        default:
          throw new Error(`Unrecognised WebPlayback.Screen type - ${child_type}`);
      }
    });
  }

  getScreenByTypeName = (type_name) => {
    return this.childrenWithAddedProps().filter(child => {
      return type_name === child.props.state;
    })[0];
  }

  render = () => {
    let result = (
      <div>
        {this.state.error && this.getScreenByTypeName("Error")}
        {!this.state.loaded && this.getScreenByTypeName("Loading")}
        {this.state.loaded && !this.state.selected && this.getScreenByTypeName("WaitingForDevice")}
        {this.state.loaded && this.state.selected && this.getScreenByTypeName("Player")}
      </div>
    );

    return result;
  }
}

export {
  WebPlaybackScreen,
  WebPlayback
};