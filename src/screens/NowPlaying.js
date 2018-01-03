import React from 'react';

export default class NowPlaying extends React.Component {
  render = () => {
    let { playerState } = this.props;
    let { position: position_ms } = playerState;
    let {
      id,
      uri: track_uri,
      name: track_name,
      duration_ms,
      artists: [{
        name: artist_name,
        uri: artist_uri
      }],
      album: {
        name: album_name,
        uri: album_uri,
        images: [{ url: album_image }]
      }
    } = playerState.track_window.current_track;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Panel heading without title</div>
        <div className="panel-body">
          Panel content
        </div>
      </div>

      <div className="App-now-playing">
        <img src={album_image} alt={track_name} />
        <h3><a href={track_uri}>{track_name}</a> by <a href={artist_uri}>{artist_name}</a></h3>
        <h3><a href={album_uri}>{album_name}</a></h3>
        <h3>ID: {id} | Position: {position_ms} | Duration: {duration_ms}</h3>
      </div>
    );
  }
}