import React, {Component} from 'react';
import './home-content.css';
import {Grid} from 'semantic-ui-react';
import NecessityIcon from './necessity-icon/necessity-icon';

class HomeContent extends Component {
  render() {
    return (
      <Grid className='home-content-grid'>
        <Grid.Row className="grid-row" columns={1}>
          <Grid.Column>
            <h1>Favorite Buildings</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="grid-row" columns={4}>
          <Grid.Column>
            <NecessityIcon />
          </Grid.Column>
          <Grid.Column>
            <NecessityIcon />
          </Grid.Column>
          <Grid.Column>
            <NecessityIcon />
          </Grid.Column>
          <Grid.Column>
            <NecessityIcon />
          </Grid.Column>
        </Grid.Row>
        {/* Empty row for spacing */}
        <Grid.Row />
        <Grid.Row className="grid-row" columns={1}>
          <Grid.Column>
            <h1>Hot Necessities</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="grid-row" columns={4}>
          <Grid.Column>
            <NecessityIcon />
          </Grid.Column>
          <Grid.Column>
            <NecessityIcon />
          </Grid.Column>
          <Grid.Column>
            <NecessityIcon />
          </Grid.Column>
          <Grid.Column>
            <NecessityIcon />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HomeContent;
