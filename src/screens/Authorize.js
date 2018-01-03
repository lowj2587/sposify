import React from 'react';

export default class AuthorizeScreen extends React.Component {
  buttonClick = (e) => {
    // Send them to accounts.spotify.com
    // SpotifyDemo.sendToLogin();
  }

  links = {
    announcement: "https://beta.developer.spotify.com/community/news/2017/11/20/announcing-the-new-spotify-web-playback-sdk-beta/",
    create_react_app: "https://github.com/facebookincubator/create-react-app",
    glitch: "https://glitch.com/edit/#!/spotify-web-playback-sdk"
  };

  render = () => {
    return (
      <div className="screen screen-authorize">
        <p>Here's a sample app built with the <a target="_blank" href={this.links.announcement}>new Web Playback SDK</a> & <a target="_blank" href={this.links.create_react_app}>Create React App</a> on <a href={this.links.glitch}>Glitch</a>.</p>
        <p><strong>Happy hacking with React!</strong></p>
        
        <button className="btn btn-lg btn-violet" onClick={this.buttonClick}>Log in with Spotify</button>
      </div>
    );
  };
}