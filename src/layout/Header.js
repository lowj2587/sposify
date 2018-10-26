import React from 'react';
import logo from './../logo.svg';

export default () => {
  return (
    <React.Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="visually-hidden">Spotify for Developers</span>
      </header>
      <div className="secondaryNav secondaryNav-webApi">
        <p>Web API</p>
      </div>
    </React.Fragment>    
  );
};
