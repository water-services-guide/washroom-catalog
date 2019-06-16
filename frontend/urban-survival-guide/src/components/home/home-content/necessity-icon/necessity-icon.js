import React, {Component} from 'react';
import {Image, Card} from 'semantic-ui-react';
import image from '../../../../../images/default-image.png';
import {Link} from 'react-router-dom';

class NecessityIcon extends Component {
  render() {
    return (
      <div>
        {/* TODO the necessity id must be dynamic */}
        <Card centered>
          <Link to="/necessity/washroom/1">
            <Image src={image} />
          </Link>
          <Card.Content>
            <Card.Header>Necessity Name</Card.Header>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default NecessityIcon;
