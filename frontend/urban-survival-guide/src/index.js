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
  <Nav></Nav>
    <div>
      <Switch>
      <Route path="/necessity/:type/:id" component={NecessityDetail} />
      <Route path="/home" component={Home} />
      <Route exact path="/" component={App} />
      <Route exact path="/necessities" component={NecessityResults} />
      <Route exact path="/search" component={NecessitySearch} />
      <Route exact path="/admin" component={Admin} />
      </Switch>
    </div>
  </Router>
  </div>
)
 ReactDOM.render( routing, document.getElementById('root') );
