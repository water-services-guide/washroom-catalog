import React, { Component } from 'react';
import './App.css';
import Login from './components/login/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <Login>
        </Login>
        </div>
      </div>
    );
  }
}

export default App;
