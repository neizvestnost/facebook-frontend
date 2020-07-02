import React, { Component } from 'react'
import { Header, Segment, Button, Icon } from 'semantic-ui-react'

export default class SiteHeader extends Component {
  render() {
    return (
      <Segment clearing>
        <Header as='h3' color='purple' floated='left'>
          Facebook
        </Header>
        <Header as='h3' color='purple' floated='right'>
          <Button color='purple' onClick={this.handleClick} ><Icon name='sign-out' /></Button>
        </Header>
      </Segment>
    )
  }

  handleClick = () => {
    localStorage.removeItem('token')
    this.props.history.push('/')
  }
}