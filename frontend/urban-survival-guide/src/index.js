import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import Nav from './components/header/header';
import Home from './components/home/home';
import NecessityDetail from './components/necessity-detail/necessity-detail';
import NecessityResults from './components/necessity-results/necessity-results';
import NecessitySearch from './components/necessity-search/necessity-search';
import './index.css';
import Admin from './components/admin/admin';

const routing = (
  <div>
    <Router>
        <App></App>
    </Router>
  </div>
)
ReactDOM.render(routing, document.getElementById('root'));
