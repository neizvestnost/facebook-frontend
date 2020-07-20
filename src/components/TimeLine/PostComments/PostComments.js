import React, { Component } from 'react'
import { Comment, Form, Button } from 'semantic-ui-react'
import styles from './PostComments.module.css'
import axios from '../../../utils/API'

class PostComments extends Component {
  state = {
    text: null
  }

  render() {
    const { page, totalPages, comments } = this.props
    const commentsToRender = comments.map(comment => {
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
          </Comment.Content>
        </Comment>
      )
    })
    return(
      <Comment.Group>
        {commentsToRender}

        {page !== totalPages ? this.renderLoader() : ''}
        <Form reply size='tiny' onSubmit={this.handleSubmitForm}>
          <Form.TextArea onChange={this.handleOnChange}/>
          <Button content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>  
    )
  }
  renderLoader = () => {
    return(
      <div className={styles.commentsLoaderWrapper} onClick={this.handleLoadMoreClick}>
        <div className={styles.commentsLoader}>
          Click to load more!)
        </div>
      </div>
    )
  }
  handleLoadMoreClick = async () => {
    try {
      const response = await axios.get(`/posts/${this.props.postId}/comments?page=${this.props.page + 1}`)
      this.props.handleCommentsResponse(response)
    } catch (error) {
      console.log(error)
      this.setState({ error: error.data.errors.detail })
    }
  }

  handleSubmitForm = async () => {
    if (!this.state.text) {
      return this.setState({ error: 'Comment body is empty' })
    }
    try {
      const response = await axios.post(`/posts/${this.props.postId}/comments`, {
        body: this.state.text,
        user_id: this.props.userId
      })
      const { id, body, post_id: postId, user_email: userEmail } = response.data.comment.data.attributes
      
      this.props.handleAddComment(
        {
          id: id, 
          body: body, 
          postId: postId,
          userEmail: userEmail
        }
      )
    } catch (error) {
      console.log(error)
      this.setState({ error: error.data.errors.detail })
    }
  }

  handleOnChange = (e, { value }) => (this.setState({ text: value }))
}

export default PostComments