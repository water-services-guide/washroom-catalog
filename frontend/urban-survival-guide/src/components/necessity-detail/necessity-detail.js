import React from 'react'
import { Divider, Grid, Image, Segment, Button } from 'semantic-ui-react'
import image from '../../../images/default-image.png'
import CommentGroup from './comment-group'

const NecessityDetail = () => (
  <div>
    <Segment>
      <Grid columns={2} relaxed='very'>
        <Grid.Column>
          <h1>Necessity Name</h1>
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

    {/* add building favourites, likes and ratings */}

    <div class="ui vertically divided grid">
      <div class="two column row">
        <div class="column">
          <CommentGroup></CommentGroup>
        </div>
        <div class="column">
          <Button>Report an Incident</Button>
        </div>
      </div>
    </div>

  </div>
)

export default NecessityDetail
