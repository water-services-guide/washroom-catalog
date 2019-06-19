import React, {Component} from 'react';
import './home-content.css';
import {Grid} from 'semantic-ui-react';
import NecessityIcon from './necessity-icon/necessity-icon';
import BuildingIcon from './building-icon/building-icon';

class HomeContent extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Grid columns={4} className="home-content-grid">
        <Grid.Row className="grid-row">
          <Grid.Column>
            <h1>Favourite Buildings</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="grid-row">
          {this.props.favouriteBuildings.map((data, idx) => {
            return (
              <Grid.Column key={idx}>
                <BuildingIcon buildingName={data.Name} buildingId={data.Building_id}/>
              </Grid.Column>
            );
          })}
        </Grid.Row>

        <Grid.Row>{/* Empty row for spacing */}</Grid.Row>

        <Grid.Row className="grid-row">
          <Grid.Column>
            <h1>Hot Necessities</h1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="grid-row">
          {this.props.hotNecessities.map((data, idx) => {
            return (
              <Grid.Column key={idx}>
                <NecessityIcon
                  necessityName={data.name}
                  necessityId={data.Necessity_id}
                />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    );
  }
}

export default HomeContent;
