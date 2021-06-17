import React, {useState} from 'react'
import Auth from "../pages/Auth/Auth";
import Todolist from '../pages/Todolist/Todolist'
import Users from '../pages/Users/Users'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import {BrowserRouter as Router, NavLink, Switch, Redirect, Route} from 'react-router-dom'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <ErrorBoundary>
      <Router>
        <div className='routing'>
          <button onClick={() => setIsLoggedIn(!isLoggedIn)}>{isLoggedIn.toString()}</button>
          <NavLink to='/' exact>Auth</NavLink>
          <NavLink to='/todolist'>Todolist</NavLink>
          <NavLink to='/users'>Users</NavLink>
        </div>

        <div className='App'>
          <Switch>
            <Route exact path='/' component={Auth}/>
            {isLoggedIn
              ? <>
                <Route path='/todolist' component={Todolist}/>
                <Route path='/users' component={Users}/>
              </>
              : null
            }
            <Redirect to='/'/>
            {/*<Route render={() => <h1>404 not found</h1>}/>*/}
          </Switch>
        </div>
      </Router>
    </ErrorBoundary>
  )
}


export default App