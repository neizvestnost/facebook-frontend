import React, { Component } from 'react'
import axios from '../../utils/API'
import styles from "./LoginPage.module.css";
import { Container, Button, Form, Message, Header } from 'semantic-ui-react'

export default class LoginPage extends Component {
  state = { email: '', password: '', errors: [], loading: false }

  render() {
    const { email, password, loading, errors } = this.state

    let errorMessage = {}
    errors.map(error => {
     return errorMessage[error.field] = 
        <Message
          error
          header={error.detail}
        />
    })

    return (
      <div className={styles.loginContainerWrapper}>
        <div className={styles.loginFormWrapper}>
          <Container textAlign='center' >
            <Header size='medium'>
              Login
            </Header>
            <Form onSubmit={this.handleSubmit} loading={loading} error={!!errors.length}>
              <Form.Input
                label='Email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={this.handleChange}
              />
              {!!errors.length && errorMessage.email}
              <Form.Input
                type='password'
                label='Password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={this.handleChange}
              />
              {!!errors.length && errorMessage.password}
              <Button type='submit' color='facebook'>Log in</Button>
            </Form>
          </Container>
        </div>
      </div>
    )
  }
  
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    const { email, password } = this.state

    this.sendRequest(email, password)
  }

  sendRequest = async (email, password) => {
    try {
      this.setState({ loading: true })

      const response = await axios.post('/users/session', {
        email: email,
        password: password
      })

      localStorage.setItem('token', response.data.token)
      this.setState({ errors: [] })
      this.props.history.push('/dashboard')
    } catch (error) {
      this.setState(prevState => ({ ...prevState, errors: error.response.data.errors }))
    } finally {
      this.setState({ loading: false })
    }
  }
}
