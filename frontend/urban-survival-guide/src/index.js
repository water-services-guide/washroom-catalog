import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import NecessityDetail from './components/necessity-detail/necessity-detail';
import NecessityResults from './components/necessity-results/necessity-results';
import Home from './components/home/home';
import 'semantic-ui-css/semantic.min.css';
import Nav from './components/header/header'

const routing = (
  <div>
  <Nav></Nav>
  <Router>
    <div>
      <Route path="/necessity/:type/:id" component={NecessityDetail} />
      <Route path="/home" component={Home} />
      <Route exact path="/" component={App} />
      <Route exact path="/necessities" component={NecessityResults} />
    </div>
  </Router>
  </div>
)
 ReactDOM.render( routing, document.getElementById('root') );
