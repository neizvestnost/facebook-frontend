import React, { Component } from 'react'
import { Comment, Form, Button } from 'semantic-ui-react'
import styles from './PostComments.module.css'

class PostComments extends Component {
  render() {
    console.log(this.props.comments)
    const comments = this.props.comments.map(comment => {
      return (
        <Comment key={comment.id} className={styles.commentWrapper}>
          <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
          <Comment.Content>
            <Comment.Author>{comment.userEmail}</Comment.Author>
            <Comment.Metadata>
              <div>1 day ago</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>
                {comment.body}
              </p>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      )
    })
    return(
      <Comment.Group>
        {comments}

        <Form reply size='tiny'>
          <Form.TextArea />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>  
    )
  }
}

export default PostComments