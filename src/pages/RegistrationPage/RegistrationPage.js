import React, { Component } from 'react'
import axios from '../../utils/API'
import { Container, Button, Form, Message } from 'semantic-ui-react'

export default class RegistrationPage extends Component {
  state = { email: '', password: '', errors: [], loading: false }

  render() {
    const { email, password, loading, errors } = this.state
    let errorMessage = {}
    errors.map(error => {
      const header = `Incorrect ${error.field.charAt(0).toUpperCase()}${error.field.slice(1)}`
     return errorMessage[error.field] = 
        <Message
          error
          header={header}
          content={error.detail}
        />
    })
    return (
      <Container textAlign='center' text>
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
          <Button type='submit' color='facebook'>Submit</Button>
        </Form>
      </Container>
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

      await axios.post('/users/registration', {
        email: email,
        password: password
      })

      this.setState({ errors: [] })
      this.props.history.push('/login')
    } catch (error) {
      this.setState(prevState => ({ ...prevState, errors: error.response.data.errors }))
    } finally {
      this.setState({ loading: false })
    }
  }
}
