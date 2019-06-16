import React, { Component } from 'react'
import { Grid, Image, Segment, Button } from 'semantic-ui-react'
import image from '../../../images/default-image.png'
import CommentGroup from './comment-group'
import axios from 'axios'
import NecessitySpecs from './necessity-spec';
import IncidentReport from './incident-report';

class NecessityDetail extends Component {

  API = 'http://localhost:5000/necessity/'
  necessityId = ""
  necessityType = ""


  constructor(props) {
    super(props)
    this.state = {
      data: {
        building: {},
        comments: [],
        isBuildingFavourite: false,
        isLiked: false,
        maintenanceCompany: {},
        necessity: {},
        rating: 0,
        services: []
      }
    }
    this.addComment = this.addComment.bind(this);
  }


  addComment(comment) {
    this.setState({
      data: {
        ...this.state.data,
        comments: [...this.state.data.comments, comment]
      }
    });
  }

  componentDidMount() {
    const { id, type } = this.props.match.params
    this.necessityId = id
    this.necessityType = type
    axios.get(this.API + type + '/' + id)
      .then(({ data }) => {
        this.setState({
          data: {
            building: data.building,
            comments: data.comments,
            isBuildingFavourite: data.isBuildingFavourite,
            isLiked: data.isLiked,
            maintenanceCompany: data.maintenanceCompany,
            necessity: data.necessity,
            rating: data.rating,
            services: data.services
          }
        });
      })

  }

  render() {
    return (
      <div>
        <Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <h1> {this.state.data.necessity.name} </h1>
              <p>
                <Image src={image} className="ui fluid image" />
              </p>

            </Grid.Column>
            <Grid.Column>
              <NecessitySpecs data={this.state.data}></NecessitySpecs>
            </Grid.Column>
          </Grid>
        </Segment>

        {/*TODO add building favourites, likes and ratingss */}

        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <CommentGroup data={this.state.data} addComment={this.addComment} API={this.API + this.necessityId + "/comments"}></CommentGroup>
            </Grid.Column>

            <Grid.Column>
              <IncidentReport></IncidentReport>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default NecessityDetail
