import React, {Component} from 'react';
import axios from 'axios';
import './necessity-icon.css';
import {Image, Card} from 'semantic-ui-react';
import image from '../../../../../images/default-image.png';
import {Link} from 'react-router-dom';

class NecessityIcon extends Component {
  constructor(props) {
    super();

    this.state = {
      url: '',
    };
  }

  getNecessityUrl(id) {
    axios.get('http://localhost:5000/NecessityType/' + id).then((response) => {
      this.setState({
        url: '/necessity/' + response.data + '/' + id,
      });
    });
  }

  componentWillMount() {
    this.getNecessityUrl(this.props.necessityId);
  }

  render() {
    return (
      <Card centered className="necessity-icon">
        <Link to={this.state.url}>
          <Image src={image} />
        </Link>
        <Card.Content>
          <Card.Header>
            {this.props.necessityName === null
              ? 'Unknown name'
              : this.props.necessityName}
          </Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

export default NecessityIcon;
