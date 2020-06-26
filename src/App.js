import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route exact path='/' component={HomePage} />
      <Route path='/registration' component={RegistrationPage} />
      <Route path='/login' component={LoginPage} />
    </Router>
  )
}

export default App;
