import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Header = () => {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
};

const HeaderProduct = (props) => {
  console.log(props);
  return (
    <a href="https://beta.developer.spotify.com/documentation/web-playback-sdk" className="App-product web-playback-sdk">
      Web Playback SDK
    </a>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <HeaderProduct />
        <main>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </main>
      </div>
    );
  }
}

export default App;
