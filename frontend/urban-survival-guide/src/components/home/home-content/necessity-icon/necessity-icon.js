import React, {Component} from 'react';
import axios from 'axios';
import './necessity-icon.css';
import default_washroom from '../../../../../images/default_washroom.png';
import default_shower from '../../../../../images/default_shower.jpg';
import default_fountain from '../../../../../images/default_fountain.jpg';
import {Image, Card} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class NecessityIcon extends Component {
  constructor(props) {
    super();

    this.state = {
      url: '',
      necessityType: '',
    };
  }

  getNecessityUrl(id) {
    axios.get('http://localhost:5000/NecessityType/' + id).then((response) => {
      this.setState({
        url: '/necessity/' + response.data + '/' + id,
        necessityType: response.data,
      });
    });
  }

  componentWillMount() {
    this.getNecessityUrl(this.props.necessityId);
  }

  render() {
    let imageSrc;
    if (this.state.necessityType === 'washroom') {
      imageSrc = default_washroom;
    } else if (this.state.necessityType === 'shower') {
      imageSrc = default_shower;
    } else {
      imageSrc = default_fountain;
    }

    return (
      <Card centered className="necessity-icon">
        <Link to={this.state.url}>
          <Image src={imageSrc} />
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
