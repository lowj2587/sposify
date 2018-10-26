export default () => new Promise((resolve, reject) => {
  const docsUrl = "https://developer.spotify.com/documentation/web-api/reference-beta/v0.json";
  fetch(docsUrl).then(res => res.json()).then(res => res.reference).then(resolve).catch(reject);
});