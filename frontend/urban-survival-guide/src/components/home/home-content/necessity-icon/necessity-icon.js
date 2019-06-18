import React, {Component} from 'react';
import './necessity-icon.css';
import {Image, Card} from 'semantic-ui-react';
import image from '../../../../../images/default-image.png';
import {Link} from 'react-router-dom';

class NecessityIcon extends Component {
  render() {
    return (
      <Card centered className='necessity-icon'>
        <Link to="/necessity/washroom/1">
          <Image src={image} />
        </Link>
        <Card.Content>
          <Card.Header>Necessity Name</Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

export default NecessityIcon;
