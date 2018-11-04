// React
import React from 'react';
import ReactDOM from 'react-dom';

// React Router
import { BrowserRouter as Router } from "react-router-dom";

// Our App
import App from './App';
import './index.css';

// Start the App!
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
