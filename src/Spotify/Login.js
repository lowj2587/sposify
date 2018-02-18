export default {
  logInWithSpotify: (() => {
    let {
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CALLBACK_URL,
    } = process.env;
    
    let client_id      = SPOTIFY_CLIENT_ID;
    let redirect_uri   = SPOTIFY_CALLBACK_URL;
    let scopes         = SPOTIFY_C;
    let scopes_encoded = scopes.replace(" ", "%20");

    window.location = [
      "https://accounts.spotify.com/authorize",
      `?client_id=${client_id}`,
      `&redirect_uri=${redirect_uri}`,
      `&scope=${scopes_encoded}`,
      "&response_type=token",
      "&show_dialog=true"
    ].join('');
  })
};