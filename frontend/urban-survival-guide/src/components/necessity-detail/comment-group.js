import React, { Component } from 'react';
import {Comment, Form, Header, Button} from 'semantic-ui-react'
import image from '../../../images/default-image.png'



class CommentGroup extends Component {

  static defaultProps = {
    data: {
      comments: []
    }  
}

  loadComments({comments}) {
    let items = []
    for (const [index, comment] of comments.entries()) {
        items.push(
          <Comment>
          <Comment.Avatar src={image} />
          <Comment.Content>
            <Comment.Author as='a'>{comment.Username}</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>{comment.Comment}</Comment.Text>
          </Comment.Content>
        </Comment>
          )
      }
      return items
  }

  render() {
    let comments = this.loadComments(this.props.data)
    return (
      <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      {comments}
      <Form reply>
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group> 
    );
  }
}

export default CommentGroup;
