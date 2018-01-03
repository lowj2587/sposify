import React from 'react';
import logo from './../logo.svg';

export default () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="visually-hidden">Spotify for Developers</span>
      </header>
    
      <div className="panel panel-default">
        <div className="panel-body">
          Basic panel example
        </div>
      </div>

      <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk" className="App-product web-playback-sdk">
        Spotify Web Playback SDK <span className="label label-warning">beta</span>
      </a>
    </div>
  );
};
