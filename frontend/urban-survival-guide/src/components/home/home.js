import React, {Component} from 'react';
import './home.css';
import HomeContent from './home-content/home-content';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <HomeContent />
      </div>
    );
  }
}

export default Home;
