import React, {useState} from 'react'
import Login from '../pages/Login/Login'
import Todolist from '../pages/Todolist/Todolist'
import Users from '../pages/Users/Users'
import Registration from '../pages/Registration/Registration'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import {BrowserRouter as Router, NavLink, Switch, Redirect, Route} from 'react-router-dom'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
    <ErrorBoundary>
      <Router>
        <div className='routing'>
          <button onClick={() => setIsLoggedIn(true)}>ON</button>
          <NavLink to='/' exact>Login</NavLink>
          <NavLink to='/todolist'>Todolist</NavLink>
          <NavLink to='/users'>Users</NavLink>
          <NavLink to='/registration'>Registration</NavLink>
        </div>

        <div className='App'>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/todolist' component={Todolist}/>
            {/*{isLoggedIn ?  <Route path='/todolist' component={Todolist}/> : null}*/}
            <Route path='/users' component={Users}/>
            <Route path='/registration' component={Registration}/>
            <Redirect to='/'/>
            {/*<Route render={() => <h1>404 not found</h1>}/>*/}
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  )
}


export default App