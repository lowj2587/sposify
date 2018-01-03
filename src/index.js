// React
import React from 'react';
import ReactDOM from 'react-dom';

// Our App
import App from './App';
import './index.css';

// Polyfills
import './polyfill/DragAndDrop.js';

// Start the App!
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
