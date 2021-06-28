import React, {useEffect} from 'react'import Auth from "../pages/Auth/Auth";import Todolist from '../pages/Todolist/Todolist'import Users from '../pages/Users/Users'import Logout from "../pages/Logout/Logout";import ErrorBoundary from '../errorBoundary/ErrorBoundary'import {NavLink, Switch, Redirect, Route, useHistory} from 'react-router-dom'import './App.css'import {connect} from "react-redux";import {logout, setIsLogin, setCurrentPerson} from "../redux/actions/auth";function App({state, setIsLogin, logout, setCurrentPerson}) {  const history = useHistory()  const str = history.location.pathname.includes('todolist')  const token = localStorage.getItem('token')  const currentPerson = JSON.parse(localStorage.getItem('currentPerson'))  useEffect(() => {    if (state.token) {      setCurrentPerson(JSON.parse(localStorage.getItem('currentPerson')))      const expirationTime = new Date(localStorage.getItem('expirationTime'))      if (expirationTime <= new Date()) {        setIsLogin(true)        logout()      }    }  }, [])  return (    <ErrorBoundary>      <div className='routing'>        {token          ?          <>            {currentPerson              ?              <p className='currentUser'>                Signed in as {currentPerson.nickname} <br/>                {state.currentUser && str                  ? `User page ${state.currentUser.nickname}`                  : null                }              </p>              : null            }            {currentPerson?.role === 'admin'              ?              <>                <NavLink to='/users'>Users</NavLink>              </>              : null}            <NavLink to='/logout'>Logout</NavLink>          </>          : null        }      </div>      {token ? <hr/> : null}      <div className='App'>        {token          ?          currentPerson?.role === 'admin'            ?            <Switch>              <Route exact path='/users' component={Users}/>              {state.allowedUsersId && state.currentUser                ?                <Route                  exact                  path={`/todolist/:${state.allowedUsersId.find(userId => userId === state.currentUser.nickname)}`}                  component={Todolist}                />                : null              }              <Route exact path='/logout' component={Logout}/>              <Redirect to='/users'/>              {/*<Route render={() => <h1>404 not found</h1>}/>*/}            </Switch>            :            <Switch>              {state?.currentPerson?.nickname                ?                <>                  <Route                    exact                    path={`/todolist/:${state.currentPerson.nickname}`}                    component={Todolist}/>                  <Route path='/logout' component={Logout}/>                  <Redirect to={`/todolist/:${state.currentPerson.nickname}`}/>                </>                : <>                  <Route path='/logout' component={Logout}/>                  <Route render={() => <h1>404 not found</h1>}/>                </>              }            </Switch>          :          <Switch>            <Route path='/' component={Auth}/>            <Redirect to='/'/>          </Switch>        }      </div>    </ErrorBoundary>  )}export default connect(  state => ({state: state.auth}),  {setIsLogin, logout, setCurrentPerson})(App)