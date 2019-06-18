import React, { Component } from 'react'
import { Grid, Image, Segment, Rating, Button, Icon } from 'semantic-ui-react'
import image from '../../../images/default-image.png'
import CommentGroup from './comment-group'
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
    console.log("up a level for building fav: " + data.isBuildingFavourite)
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
    /// add average rating
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
    return (
      <div>
        <Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <h1> {this.state.data.necessity.name} </h1>
              <p>
                <Image src={image} className="ui fluid image" />
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
