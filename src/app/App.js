import React from 'react'
import Todolist from '../pages/todolist/Todolist'
import Login from '../pages/login/Login'
import Registration from '../pages/registration/Registration'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Route exact path='/'>
          <Login/>
        </Route>

        <Route exact path='/registration'>
          <Registration/>
        </Route>

        <Route exact path='/todolist'>
          <Todolist/>
        </Route>
      </Router>
    </>
  )
}


export default App