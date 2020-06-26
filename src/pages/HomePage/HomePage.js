import React from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <Container textAlign='center' text>
      Welcome to FB
      <div className={styles.buttonsContainer}>
        <Button as={Link} to='/registration' color='facebook'>
          Registration
        </Button>
        <div className={styles.verticalLine} />
        <Button as={Link} to='/Login' color='facebook'>
          Login
        </Button>
      </div>
    </Container>
  )
}
