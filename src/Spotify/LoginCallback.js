export default (onAccessTokenExpiration) => {
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
    return localStorage.getItem('access_token');
  } else if (hashExists) {
    window.location.hash = '';
    
    // Set access token
    localStorage.setItem('access_token', hashObj.access_token);

    // Let us know when the access token expires
    setTimeout(() => {
      if (typeof onAccessTokenExpiration !== "undefined") { onAccessTokenExpiration(); }
    }, hashObj.expires_in * 1000);

    return hashObj.access_token;
  }
  else {
    return null;
  }
};