import React from 'react'
import {Comment, Form, Header, Button} from 'semantic-ui-react'
import image from '../../../images/default-image.png'

const CommentGroup = (props) => (
    <Comment.Group>
    <Header as='h3' dividing>
      Comments {props.example}
    </Header>

    <Comment>
      <Comment.Avatar src={image} />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
      </Comment.Content>
    </Comment>


    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group> 
)

export default CommentGroup
