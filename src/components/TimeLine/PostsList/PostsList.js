import React, { Component } from 'react'
import { Card, Button, Icon, Segment, Divider, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { showComments } from '../../../actions/comments'
import styles from './PostList.module.css'
import PostComments from '../PostComments'
import axios from '../../../utils/API'

class PostsList extends Component {
  state = {
    comments: [],
    error: null
  }

  render() {
    const { error, comments } = this.state
    const postElements = this.props.posts.map(post => {
      return (
        <Card key={post.id} className={styles.cardWrapper}>
          {!!error && error}
          <Card.Content header={post.title} />
          <Card.Content description={post.body} />
          <Card.Content extra>
            <Segment >
              <Grid columns={2} divided>
                <Grid.Row>
                  <Grid.Column textAlign='center'>
                    <Icon name='like' /> 5 likes
                  </Grid.Column>
                  <Grid.Column textAlign='center'>
                    <Button color='facebook' size='small' content='Show Comments' onClick={() => this.handleButtonOnClick(post.id)} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Divider vertical>Or</Divider>
            </Segment>
          </Card.Content>
          {post.showComments && <PostComments comments={comments.filter(comment => comment.postId === post.id)} postId={post.id} userId={this.props.userId} handleAddComment={this.handleAddComment} />}
        </Card>
      )
    })

    return(
      <div>
        {postElements}
      </div>
    )
  }

  handleAddComment = comment => {
    this.setState(prevState => ({ comments: [...prevState.comments, comment]}))
  }

  handleButtonOnClick = postId => {
    const posts = this.props.posts.map(post => post.id === postId ? {...post, showComments: !post.showComments } : {...post, showComments: false })
    this.props.showComments(posts)

    const showPostComments = posts.filter(post => post.showComments)

    if (showPostComments.length) {
      this.fetchComments(showPostComments[0].id)
    }
    // showPostComments.length && this.props.fetchComments(showPostComments[0].id)
  }

  fetchComments = async (postId) => {
    try {
      const response = await axios.get(`/posts/${postId}/comments`)
      this.setState({comments: response.data.comments.data.map(comment => (
        {
          id: comment.attributes.id, 
          body: comment.attributes.body, 
          postId: comment.attributes.post_id,
          userEmail: comment.attributes.user_email
        }
      ))})
    } catch (error) {
      this.setState({ error: error.response.data.error.message })
    }
  }
}

const mapDispatchToProps = {
  showComments
}

const mapStateToProps = state => {
  return {
    userId: state.user.user.id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)