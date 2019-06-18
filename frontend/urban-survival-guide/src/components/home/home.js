import React, {Component} from 'react';
import axios from 'axios';
import './home.css';
import HomeContent from './home-content/home-content';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      buildings: [],
      necessities: [],
    };

    this.getFavouriteBuildings = this.getFavouriteBuildings.bind(this);
    this.getHotNecessities = this.getHotNecessities.bind(this);
  }

  getFavouriteBuildings() {
    let query = 'http://localhost:5000/favouriteBuildings';

    axios.get(query).then((response) => {
      var buildings = [];
      for (let building of response.data) {
        buildings.push(building);
      }

      this.setState({
        buildings: buildings,
      });
    });
  }

  getHotNecessities() {
    let query = 'http://localhost:5000/necessitiesLikedByAllUsers';

    axios.get(query).then((response) => {
      var necessities = [];
      for (let necessity of response.data) {
        necessities.push(necessity);
      }

      this.setState({
        necessities: necessities,
      });
    });
  }

  componentWillMount() {
    this.getFavouriteBuildings();
    this.getHotNecessities();
  }

  render() {
    return (
      <div className="home">
        <HomeContent
          favouriteBuildings={this.state.buildings}
          hotNecessities={this.state.necessities}
        />
      </div>
    );
  }
}

export default Home;
