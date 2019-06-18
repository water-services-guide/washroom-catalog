import React, {Component} from 'react';
import './building-icon.css';
import {Image, Card} from 'semantic-ui-react';
import image from '../../../../../images/default-image.png';
import {Link} from 'react-router-dom';

class BuildingIcon extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Card centered className='building-icon'>
        <Link to="/necessity/washroom/1">
          <Image src={image} />
        </Link>
        <Card.Content>
          <Card.Header>{this.props.buildingName === null ? 'Unknown name' : this.props.buildingName}</Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

export default BuildingIcon;
