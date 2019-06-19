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
import { Redirect } from 'react-router';


class App extends Component {

  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);

    this.state = {
      loggedOn: false
    };
  }


  refresh(key, value) {
    this.setState({key: value})
  }

  render() {
  //   if (!this.state.loggedOn) {
  //     return <Redirect to="/login" />;
  //   }
    return (
      <div className="App">
        <Nav refresh={this.refresh}></Nav>
        <Switch>
          <Route path="/necessity/:type/:id" component={NecessityDetail} />
          <Route exact path="/login" render={props => <Login refresh={this.refresh} />} />
          {/* <Route path="/login" component={Login} refresh={this.refresh}/> */}
          <Route exact path="/necessities" component={NecessityResults} />
          <Route exact path="/search" component={NecessitySearch} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/" component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
