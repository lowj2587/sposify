// React
import React, { Component } from 'react';

// Assets
import './App.css';
import logo from './logo.svg';

// Documentation API
import { getDocumentationFromApi } from './services/getDocumentationFromApi.js';
import { sidebarFromDocumentation } from './services/extractSidebarFromDocumentation.js';
import { documentationCategoriesWithEndpoints } from './services/documentationCategoriesWithEndpoints.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      status: 'loading',
      documentation: null,
      documentationCategories: null
    };
    
    this.releaseVersion = 'beta-0.0.1';
  }
  
  componentWillMount() {
    getDocumentationFromApi().then(documentation => {
      const documentationCategories = sidebarFromDocumentation(documentation).categories;
      
      this.setState({ status: 'loaded', documentation, documentationCategories });      
    }).catch(err => {
      console.error({ err });
      this.setState({ status: 'error' });
    });
  }
  
  render() {
    const { status, documentation, documentationCategories } = this.state;
    const categoriesWithEndpoints = documentation ? documentationCategoriesWithEndpoints(documentation) : {};
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="visually-hidden">Spotify for Developers</span>
        </header>
        <div className="secondaryNav secondaryNav-webApi">
          <h1>Web API Reference <span className="version">{this.releaseVersion}</span></h1>
        </div>
      
        <main>
          {status === 'loading' && <h3>Loading ...</h3>}
          {status === 'error' && <h3>An unexpected error occurred. Refresh!</h3>}
          {status === 'loaded' && <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2 sidebarNav">
                <ul>
                  <li>
                    <a href="#">Introduction</a>
                  </li>
                  <li>
                    <a href="#">Docs</a>
                    <ul>
                    {documentationCategories.map(documentationCategory => (
                      <li>
                        <a href={documentationCategory.categoryUrl}>{documentationCategory.categoryName}</a>
                      </li>
                    ))}
                    </ul>
                  </li>
                  <li>
                    <a href="https://github.com/spotify/web-api/issues" target="_blank" rel="nofollow" alt="Developer Support on GitHub">Support</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-10">

              {Object.keys(categoriesWithEndpoints).map(endpointCategory => (
                <div className="endpointCategory">
                  <h1><a href="#">{endpointCategory} API</a></h1>
                </div>
              ))}

              </div>
            </div>
          </div>}
        </main>
        
        <footer className="footer footer-default footer-simple" role="contentinfo">
          <div className="container">
            <nav class="row">
              <div class="col-xs-12 col-md-3">
                <div class="footer-logo">
                  <a href="https://developer.spotify.com">Spotify</a>
                </div>
              </div>
              <div class="col-xs-6 col-sm-4 col-md-2">
                <h3 class="nav-title">Company</h3>
                <ul class="nav">
                  <li><a href="https://www.spotify.com/about-us/contact/">About</a></li>
                  <li><a href="https://www.spotifyjobs.com">Jobs</a></li>
                  <li><a href="https://newsroom.spotify.com">For the Record</a></li>
                </ul>
              </div>
              <div class="col-xs-6 col-sm-4 col-md-2">
                <h3 class="nav-title">Communities</h3>
                <ul class="nav">
                  <li><a href="https://artists.spotify.com">For Artists</a></li>
                  <li><a href="https://developer.spotify.com">Developers</a></li>
                  <li><a href="https://www.spotify.com/brands/">Brands</a></li>
                  <li><a href="https://investors.spotify.com">Investors</a></li>
                  <li><a href="https://spotifyforvendors.com">Vendors</a></li>
                </ul>
              </div>
              <div class="col-xs-6 col-sm-4 col-md-2">
                <h3 class="nav-title">Useful Links</h3>
                <ul class="nav">
                  <li><a href="https://support.spotify.com">Help</a></li>
                  <li><a href="https://www.spotify.com/purchase/ecards/">Gift</a></li>
                  <li><a href="https://open.spotify.com">Web Player</a></li>
                </ul>
              </div>
              <div class="col-xs-12 col-md-5 col-social">
                <ul class="nav">
                  <li>
                    <a href="https://twitter.com/spotifyplatform">
                      <svg class="social-icon" id="twitter-icon" viewBox="0 0 448 448">
                        <path d="m27 347.75q8.75 1 19.5 1 56.25 0 100.25-34.5-26.25-0.5-47-16.125t-28.5-39.875q8.25 1.25 15.25 1.25 10.75 0 21.25-2.75-28-5.75-46.375-27.875t-18.375-51.375v-1q17 9.5 36.5 10.25-16.5-11-26.25-28.75t-9.75-38.5q0-22 11-40.75 30.25 37.25 73.625 59.625t92.875 24.875q-2-9.5-2-18.5 0-33.5 23.625-57.125t57.125-23.625q35 0 59 25.5 27.25-5.25 51.25-19.5-9.25 28.75-35.5 44.5 23.25-2.5 46.5-12.5-16.75 24.5-40.5 41.75 0.25 3.5 0.25 10.5 0 32.5-9.5 64.875t-28.875 62.125-46.125 52.625-64.5 36.5-80.75 13.625q-67.75 0-124-36.25z"/>
                      </svg>
                      <span class="social-text">Twitter</span></a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/SpotifyPlatform">
                      <svg class="social-icon" id="facebook-icon" viewBox="0 0 448 448">
                        <path d="m119.75 242.25v-74h63.75v-54.5q0-46.5 26-72.125t69.25-25.625q36.75 0 57 3v66h-39.25q-21.5 0-29 9t-7.5 27v47.25h73.25l-9.75 74h-63.5v189.75h-76.5v-189.75h-63.75z"/>
                      </svg>
                      <span class="social-text">Facebook</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <nav className="row row-small">
              <div className="col-xs-7">
                <ul className="nav nav-small">
                  <li>
                    <a href="https://www.spotify.com/legal/">Legal</a>
                  </li>
                  <li>
                    <a href="https://www.spotify.com/privacy/">Privacy Center</a>
                  </li>
                  <li>
                    <a href="https://www.spotify.com/legal/privacy-policy/">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="https://www.spotify.com/legal/cookies-policy/">Cookies</a>
                  </li>
                </ul>
              </div>
              <div className="col-xs-5 text-right">
                <small className="copyright">&copy; 2018 Spotify AB</small>
              </div>
            </nav>
          </div>
        </footer>
      </div>
    );
  }
};
