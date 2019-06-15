import React, { Component } from 'react';
import { Comment, Form, Header, Button } from 'semantic-ui-react'
import image from '../../../images/default-image.png'


/*
TODO:
  - submit comments to the server
  - retrieve username from local storage to use in comment submission 
  - retrieve comment dates
*/
class CommentGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: {
        // change username when we have users setup
        Username: "",
        Comment: ""
      }
    }

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static defaultProps = {
    data: {
      comments: []
    },
    addComment: {}
  }

  onSubmit(e) {
    e.preventDefault();
    // use axios post the comment to the server here

    this.props.addComment(this.state.comment) 

    this.setState({
      comment: {
        Username: "blank for now",
        Comment: ""
      }
    })
  }

  loadComments({ comments }) {
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

  handleFieldChange(event) {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      comment: {
        Username: "blank name for now",
        Comment: value
      }
    });
  }

  render() {
    let comments = this.loadComments(this.props.data)
    return (
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
      </Header>
        {comments}
        <Form reply 
        onSubmit={this.onSubmit}>
          <Form.TextArea
            onChange={this.handleFieldChange}
            value={this.state.comment.Comment}
          />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    );
  }
}

export default CommentGroup;
