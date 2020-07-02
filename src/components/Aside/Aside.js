import React, { Component } from 'react'
import styles from './Aside.module.css'
import { Container, Card, Image, Icon, Accordion, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SettingItems = (
  <>
    <Button as={Link} to='/editProfile' color='facebook' size='tiny' icon='user' labelPosition='left' content='Edit Profile' />
  </>
)

export default class Aside extends Component {
  state = {
    activeIndex: -1
  }

  render() {
    return (
      <div className={styles.asideWrapper}>
        {this.renderUserBlock()}
        {this.renderAccordion()}
      </div>
    )
  }

  renderAccordion = () => {
    const { activeIndex } = this.state

    return (
      <Accordion as={Menu} vertical className={styles.asideAccordion}>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            content='Settings'
            index={0}
            icon='settings'
            onClick={this.handleMenuItemClick}
          />
          <Accordion.Content active={activeIndex === 0} content={SettingItems} />
        </Menu.Item>
      </Accordion>
    )
  }

  handleMenuItemClick = (e, titleProps) => {
    const { activeIndex } = this.state
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  renderUserBlock = () => {
    const { email, created_at_year } = this.props.user

    return (
      <Container>
        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
          <Card.Content>
          <Card.Header>{email}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in {created_at_year}</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </Container>
    )
  }
}
