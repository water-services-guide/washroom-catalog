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
import PrivateRoute from './PrivateRoute';


class App extends Component {

  constructor(props) {
    super(props);
    this.setLoggedIn = this.setLoggedIn.bind(this);

    this.state = {
      loggedIn: (localStorage.getItem('user_id') !== null)
    };
  }


  setLoggedIn(value) {
    this.setState({ 
      loggedIn: value 
    });
  }

  render() {
    return (
      <div>
        <Nav setLoggedIn={this.setLoggedIn}></Nav>
        <div className="view">
          <Switch>
            <Route exact path="/login" render={props => <Login setLoggedIn={this.setLoggedIn} />} />
            <PrivateRoute path="/necessity/:type/:id" component={NecessityDetail} loggedIn={this.state.loggedIn}/>
            <PrivateRoute exact path="/necessities" component={NecessityResults} loggedIn={this.state.loggedIn} />
            <PrivateRoute exact path="/search" component={NecessitySearch} loggedIn={this.state.loggedIn} />
            <PrivateRoute exact path="/admin" component={Admin} loggedIn={this.state.loggedIn} />
            <PrivateRoute exact path="/" component={Home} loggedIn={this.state.loggedIn} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
