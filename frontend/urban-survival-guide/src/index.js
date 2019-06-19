import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import './index.css';

const routing = (
  <div>
    <Router>
        <App></App>
    </Router>
  </div>
)
ReactDOM.render(routing, document.getElementById('root'));
