import React from 'react'
import Login from '../pages/Login/Login'
import Todolist from '../pages/Todolist/Todolist'
import Users from '../pages/Users/Users'
import Registration from '../pages/Registration/Registration'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className='routing'>
          <Link to='/'>Login</Link>
          <Link to='/todolist'>Todolist</Link>
          <Link to='/users'>Users</Link>
          <Link to='/registration'>Registration</Link>
        </div>

        <div className='App'>
          <Route exact path='/'>
            <Login/>
          </Route>

          <Route exact path='/todolist'>
            <Todolist/>
          </Route>

          <Route exact path='/users'>
            <Users/>
          </Route>

          <Route exact path='/registration'>
            <Registration/>
          </Route>


        </div>
      </Router>
    </ErrorBoundary>
  )
}


export default App