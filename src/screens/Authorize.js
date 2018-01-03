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
        <p>
          We <a target="_blank" href={this.links.announcement}>just announced</a> the Web Playback SDK.
          <br />
          <br />
          Here's a sample app built with <a target="_blank" href={this.links.create_react_app}>Create React App</a> on <a href={this.links.glitch}>Glitch</a>.
          <br />
          <strong>Go have fun & build cool stuff.</strong>
        </p>
        
        <button className="btn btn-sm btn-primary" onClick={this.buttonClick}>Log in with Spotify</button>
      </div>
    );
  };
}