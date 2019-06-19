import React, { Component } from 'react';
import './App.css';
import Login from './components/login/login';
import Nav from './components/header/header';
import Home from './components/home/home';
import NecessityDetail from './components/necessity-detail/necessity-detail';
import NecessityResults from './components/necessity-results/necessity-results';
import NecessitySearch from './components/necessity-search/necessity-search';
import './index.css';
import Admin from './components/admin/admin';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav></Nav>
        <Switch>
          <Route path="/necessity/:type/:id" component={NecessityDetail} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Login} />
          <Route exact path="/necessities" component={NecessityResults} />
          <Route exact path="/search" component={NecessitySearch} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </div>
    );
  }
}

export default App;
