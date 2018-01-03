export default (callback) => {
  let { localStorage, location: {hash} } = window;
  let hashExists = hash.length > 0;
  let hashObj = () => {
    return hash.substring(1).split('&').reduce((initial, item) => {
      if (item) {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  };
  
  if (!hashExists && localStorage.getItem('access_token')) {
    return localStorage.getItem('access_toke
  } else if (hashExists) {
    window.location.hash = '';

    // Let us know when the access token expires
    setTimeout(() => {
      if (callback) { callback(); }
    }, hash.expires_in * 1000);

    return hash.access_token;
  }
  else {
    return null;
  }
};