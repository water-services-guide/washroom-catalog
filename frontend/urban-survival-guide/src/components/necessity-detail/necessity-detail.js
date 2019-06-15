import React, { Component } from 'react'
import { Grid, Image, Segment, Button } from 'semantic-ui-react'
import image from '../../../images/default-image.png'
import CommentGroup from './comment-group'
import axios from 'axios'
import NecessitySpecs from './necessity-spec';

class NecessityDetail extends Component {

  API = 'http://localhost:5000/necessity/'

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const { id, type } = this.props.match.params

    // fetch data for necessity detail here.
    axios.get(this.API + type + '/' + id)
      .then(({ data }) => {
        console.log("we got a response" + JSON.stringify(data))
        this.setState({ 
          data: {
          building: data.building, 
          comments: data.comments, 
          isBuildingFavourite: data.isBuildingFavourite, 
          isLiked: data.isLiked,
          maintenaceCompany: data.maintenanceCompany,
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
              <h1> need a name from state</h1>
              <p>
                <Image src={image} class="ui fluid image" />
              </p>

            </Grid.Column>
            <Grid.Column>
              <NecessitySpecs data={this.state.data}></NecessitySpecs>
            </Grid.Column>
          </Grid>
        </Segment>

        {/*TODO add building favourites, likes and ratings */}

        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <CommentGroup example={this.state.example}></CommentGroup>
            </Grid.Column>

            <Grid.Column>
              <Button>Report an Incident</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default NecessityDetail
