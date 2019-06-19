import React, { Component } from 'react';
import { Grid, Image, Segment, Rating, Button, Icon } from 'semantic-ui-react';
import default_washroom from '../../../images/default_washroom.png';
import default_shower from '../../../images/default_shower.jpg';
import default_fountain from '../../../images/default_fountain.jpg';
import CommentGroup from './comment-group';
import NecessitySpecs from './necessity-spec';
import IncidentReport from './incident-report';
import { getNecessityDetails, postRating, postLike } from '../../backend-client'

class NecessityDetail extends Component {
  API = "http://localhost:5000/"
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
        avg_rating: 0,
        services: []
      }
    }
    this.addComment = this.addComment.bind(this);
    this.handleLikeButton = this.handleLikeButton.bind(this);
    this.handleRate = this.handleRate.bind(this);
  }


  addComment(comment) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        comments: [...this.state.data.comments, comment]
      }
    });
  }

  async componentDidMount() {
    const { id, type } = this.props.match.params
    this.necessityId = id
    this.necessityType = type

    let data = await getNecessityDetails(type, id)
    this.setState({
      ...this.state,
      data: {
        building: data.building,
        comments: data.comments,
        isBuildingFavourite: data.isBuildingFavourite,
        isLiked: data.isLiked,
        maintenanceCompany: data.maintenanceCompany,
        necessity: data.necessity,
        rating: data.rating,
        avgRating: data.avgRating,
        services: data.services
      }
    })
  }

  handleRate(e, { rating}) {
    postRating(new Date(), this.necessityId, rating)
    console.log("rated!!!")
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        rating: rating
      }
    })
  }

  handleLikeButton() {
    postLike(this.necessityId)
    this.setState(prevState => (
      { 
        ...this.state,
        data: {
          ...this.state.data,
          isLiked: !prevState.data.isLiked
        }
      }
      ))
  }

  render() {
    let type  = this.props.match.params.type
    let imageSrc;
    if (type === 'washroom') {
      imageSrc = default_washroom;
    } else if (type === 'shower') {
      imageSrc = default_shower;
    } else {
      imageSrc = default_fountain;
    }

    return (
      <div>
        <Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <h1> {this.state.data.necessity.name} </h1>
              <p>
                <Image src={imageSrc} className="ui fluid image" />
              </p>

              <Rating maxRating={5}
                onRate={this.handleRate}
                rating={this.state.data.rating}
                clearable size='massive' />

              <Button toggle active={this.state.data.isLiked}
                onClick={this.handleLikeButton}
                floated='right'
              >
                <Icon name='thumbs up outline' size='large' />  Like
              </Button>
            </Grid.Column>
            <Grid.Column>
              <NecessitySpecs data={this.state.data} necessityId={this.necessityId}></NecessitySpecs>
            </Grid.Column>
          </Grid>
        </Segment>

        {/*TODO add building favourites, likes and ratingss */}

        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <CommentGroup data={this.state.data} addComment={this.addComment} necessity_id={this.necessityId}></CommentGroup>
            </Grid.Column>

            <Grid.Column>
              <IncidentReport necessity_id={this.necessityId}></IncidentReport>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default NecessityDetail
