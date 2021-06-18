import React, {useEffect, useState} from 'react'
import Auth from "../pages/Auth/Auth";
import Todolist from '../pages/Todolist/Todolist'
import Users from '../pages/Users/Users'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import {BrowserRouter as Router, NavLink, Switch, Redirect, Route} from 'react-router-dom'
import './App.css'
import {connect} from "react-redux";
import {authLogout, setIsLogin, setToken} from "../redux/actions/auth";

function App({state, setToken, authLogout}) {

  const [first, setFirst] = useState(true)

  useEffect(() => {

    setFirst(false)
    setToken(localStorage.getItem('token'))

    console.log()

    if (state.token) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        setIsLogin(true)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expirationDate')
        authLogout()
      }
    }

  }, [first, authLogout, state.token, setToken])


  return (
    <ErrorBoundary>
      <Router>
        <div className='routing'>
          <NavLink exact to='/'>Auth</NavLink>
          <NavLink to='/todolist'>Todolist</NavLink>
          <NavLink to='/users'>Users</NavLink>
        </div>

        <div className='App'>

          <Switch>
            {state.token
              ?
              <>
                <Route path='/todolist' component={Todolist}/>
                <Route path='/users' component={Users}/>
              </>
              : <Route exact path='/' component={Auth}/>
            }
            <Redirect to='/todolist' component={Auth}/>
            {/*<Route render={() => <h1>404 not found</h1>}/>*/}
          </Switch>
        </div>

      </Router>
    </ErrorBoundary>
  )
}

export default connect(
  state => ({state: state.auth}),
  {setToken, setIsLogin, authLogout}
)(App)