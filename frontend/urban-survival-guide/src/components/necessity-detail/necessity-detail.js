import React, { Component } from 'react'
import { Divider, Grid, Image, Segment, Button } from 'semantic-ui-react'
import image from '../../../images/default-image.png'
import CommentGroup from './comment-group'
import axios from 'axios'

class NecessityDetail extends Component {

  API = 'http://localhost:5000/'

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const { id, type } = this.props.match.params

    // fetch data for necessity detail here.
    axios.get(this.API)
      .then(res => {
        console.log("we got a response" + JSON.stringify(res))
        // this.setState({ persons });
      })
    this.setState({ name: "Necessity Name" + id, example: "it works"})
  }

  render() {
    return (
      <div>
        <Segment>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <h1> {this.state.name}</h1>
              <p>
                <Image src={image} class="ui fluid image" />
              </p>

            </Grid.Column>
            <Grid.Column>
              <p>
                Details
              </p>
            </Grid.Column>
          </Grid>

          <Divider vertical></Divider>
        </Segment>

        {/*TODO add building favourites, likes and ratings */}

        <div class="ui vertically divided grid">
          <div class="two column row">
            <div class="column">
              <CommentGroup example={this.state.example}></CommentGroup>
            </div>
            <div class="column">
              <Button>Report an Incident</Button>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default NecessityDetail
