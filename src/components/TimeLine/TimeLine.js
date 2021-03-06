import React, { Component } from 'react'
import { Header, Input, Icon } from 'semantic-ui-react'
import styles from './Timeline.module.css'
import PostsList from './PostsList'
import { connect } from 'react-redux'
import { fetchDashboard } from '../../actions/dashboard'
import { filterPosts } from '../../actions/posts'

class TimeLine extends Component {
  state = {
    showSearch: false,
    loading: false,
    headerIcon: 'down'
  }

  render() {
    return ( 
      <div className={styles.timelineWrapper}>
        <Header as='h3' color='purple' className={styles.headerSize} block textAlign='center' onClick={this.handleHeaderClick} >
          <Icon name={'arrow circle ' + this.state.headerIcon} />
          <Header.Content>Timeline</Header.Content>
        </Header>
        <div className={styles.searchWrapper}>
          {this.state.showSearch && this.renderSearch()}
        </div>
        <main className={styles.postsWrapper}>
          <PostsList posts={this.props.posts} />
        </main>
      </div>
    )
  }

  renderSearch = () => {
    return (
      <Input className={styles.search} size='large' icon='search' placeholder='Search...' loading={this.state.loading} onChange={this.handleInputChange} />
    )
  }

  handleInputChange = (e) => {
    this.props.filterPosts(e.target.value)
  }
  handleHeaderClick = () => this.setState(prevState => {
    const headerIcon = prevState.headerIcon === 'down' ? 'up' : 'down'
    return {showSearch: !prevState.showSearch, headerIcon: headerIcon }
  })
}

const mapDispatchToProps = {
  fetchDashboard,
  filterPosts
}

export default connect(null, mapDispatchToProps)(TimeLine)