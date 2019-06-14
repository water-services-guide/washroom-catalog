import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import NecessityDetail from './components/necessity-detail/necessity-detail';
import NecessityResults from './components/necessity-results/necessity-results'
import 'semantic-ui-css/semantic.min.css'

const routing = (
  <Router>
    <div>
      <Route path="/necessity/:id" component={NecessityDetail} />
      <Route exact path="/" component={App} />
      <Route exact path="/necessities" component={NecessityResults} />
    </div>
  </Router>
)
 ReactDOM.render( routing, document.getElementById('root') );
