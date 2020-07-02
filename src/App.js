import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import PrivateRoute from './containers/PrivateRoute'
import { rootReducer } from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga'
import { watchFetchDashboard } from './sagas';

const saga = createSagaMiddleware()

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(
      saga
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

saga.run(watchFetchDashboard)

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Suspense fallback='load' >
          <Route exact path='/' component={HomePage} />
          <Route path='/registration' component={RegistrationPage} />
          <Route path='/login' component={LoginPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
        </Suspense >
      </Router>
    </Provider>
  )
}

export default App;
