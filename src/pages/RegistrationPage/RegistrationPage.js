import React, { Component } from 'react'
import axios from '../../utils/API'
// import {browserHistory} from 
import { Container, Button, Form, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

export default class RegistrationPage extends Component {
  state = { email: '', password: '', errors: [], loading: false, redirect: false }

  render() {
    const { email, password, loading, errors, redirect } = this.state
    let errorMessage = {}
    errors.map(error => {
      const header = `Incorrect ${error.field.charAt(0).toUpperCase()}${error.field.slice(1)}`
      errorMessage[error.field] = 
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
          <Button type='submit'>Submit</Button>
        </Form>
        {redirect && <Redirect to='/login' />}
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

      this.setState({ errors: [], redirect: true })
    } catch (error) {
      this.setState(prevState =>({ ...prevState, errors: error.response.data.errors }))
    } finally {
      this.setState({ loading: false })
    }
  }
}
