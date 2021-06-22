import React, {useEffect} from 'react'import Auth from "../pages/Auth/Auth";import Todolist from '../pages/Todolist/Todolist'import Users from '../pages/Users/Users'import Logout from "../pages/Logout/Logout";import ErrorBoundary from '../errorBoundary/ErrorBoundary'import {NavLink, Switch, Redirect, Route, useHistory } from 'react-router-dom'import './App.css'import {connect} from "react-redux";import {logout, setIsLogin, setCurrentPerson} from "../redux/actions/auth";function App({state, setIsLogin, logout, setCurrentPerson}) {  const history = useHistory()  const str = history.location.pathname.includes('todolist')  const token = localStorage.getItem('token')  const currentPerson = JSON.parse(localStorage.getItem('currentPerson'))  useEffect(() => {    setCurrentPerson(JSON.parse(localStorage.getItem('currentPerson')))    const expirationDate = new Date(localStorage.getItem('expirationDate'))    if (expirationDate <= new Date()) {      setIsLogin(true)      logout()    }  }, [])  return (    <ErrorBoundary>      <div className='routing'>        {token          ?          <>            {currentPerson              ?              <p className='currentUser'>                Signed in as {currentPerson.name + ' ' + currentPerson.surname} <br/>                {state.currentUser && str                  ? `User page ${state.currentUser.name} ${state.currentUser.surname}`                  : null                }              </p>              : null            }            {currentPerson && currentPerson.role === 'admin'              ?              <>                <NavLink to='/users'>Users</NavLink>              </>              : null}            <NavLink to='/logout'>Logout</NavLink>          </>          : null        }      </div>      {token ? <hr/> : null}      <div className='App'>        {token          ?          currentPerson && currentPerson.role === 'admin'            ?            <Switch>              <Route exact path='/users' component={Users}/>              {state.allowedUsersId && state.currentUser                ? <Route exact                         path={`/todolist/${state.allowedUsersId.find(userId => userId === state.currentUser.personId)}`}                         component={Todolist}/>                : null              }              <Route exact path='/logout' component={Logout}/>              <Redirect to='/users'/>              {/*<Route render={() => <h1>404 not found</h1>}/>*/}            </Switch>            :            <Switch>              <Route path='/todolist' component={Todolist}/>              <Route path='/logout' component={Logout}/>              <Redirect to='/todolist'/>              {/*<Route render={() => <h1>404 not found</h1>}/>*/}            </Switch>          :          <Switch>            <Route path='/' component={Auth}/>            <Redirect to='/'/>          </Switch>        }      </div>    </ErrorBoundary>  )}export default connect(  state => ({state: state.auth}),  {setIsLogin, logout, setCurrentPerson})(App)