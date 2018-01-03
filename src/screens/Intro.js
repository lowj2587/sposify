import React from 'react';
import loginWithSpotify from '../Spotify/Login.js';

export default class IntroScreen extends React.Component {
  buttonClick = (e) => {
    e.preventDefault();
    loginWithSpotify();
  }

  links = {
    announcement: "https://beta.developer.spotify.com/community/news/2017/11/20/announcing-the-new-spotify-web-playback-sdk-beta/",
    create_react_app: "https://github.com/facebookincubator/create-react-app",
    glitch: "https://glitch.com/edit/#!/spotify-web-playback-react"
  };

  render = () => {
    return (
      <div>
        <p>Here's a sample app built with the <a target="_blank" href={this.links.announcement}>Spotify Web Playback SDK</a> & <a target="_blank" href={this.links.create_react_app}>Create React App</a> on <a href={this.links.glitch}>Glitch</a>.</p>
        <p><strong>Have fun with React!</strong></p>
        
        <button className="btn btn-md btn-violet" onClick={this.buttonClick}>Log in with Spotify</button>
        &nbsp;
        <a href={this.links.glitch} className="btn btn-md btn-salmon">Remix on Glitch</a>
      </div>
    );
  };
}