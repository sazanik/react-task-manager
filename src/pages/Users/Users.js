import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import './Users.css'
import {deleteId, setAllowedUsersId, setCurrentUser, setLoading, setUsers} from "../../redux/actions/auth";
import axios_ from "../../axios/axios";
import {clearLocalTasks} from "../../redux/actions/tasks";

function Users({setLoading, deleteId, tasks, state, setAllowedUsersId, setCurrentUser, setUsers, clearLocalTasks}) {

  const location = useLocation()

  const admin = JSON.parse(localStorage.getItem('currentPerson'))
  const persons = JSON.parse(localStorage.getItem('personList'))

  const usersOfThisAdmin = Object.values(persons?.users).filter(user => user.yourAdmin === admin.email)
  const listUserId = []
  usersOfThisAdmin.forEach(user => listUserId.push(user.nickname))

  const handleClick = (user) => {
    setCurrentUser(user)
  }


  const renderUsers = usersOfThisAdmin.map(user =>
    <li key={Math.random()}>
      <NavLink
        onClick={() => handleClick(user)}
        to={`/todolist/:${user.nickname}`}
      >
        {`${user.email} (${user.name} ${user.surname})`}
      </NavLink>
    </li>)

  const fetchUsers = async () => {
    setLoading()
    try {
      await axios_.get('/todo.json')
        .then((res) => {
          setUsers(res.data.users)
        })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setAllowedUsersId(listUserId)
    fetchUsers()

  }, [])

  useEffect(() => {
    clearLocalTasks()

  }, [state.currentUser])

  return (
    <div>
      <h1>Select user...</h1>
      <ol
        className='users-list'
      >
        {persons?.users
          ? renderUsers
          : null
        }
      </ol>
    </div>
  )
}

export default connect(
  (state) => ({state: state.auth, tasks: state.tasks}),
  {setLoading, deleteId, setAllowedUsersId, setCurrentUser, setUsers, clearLocalTasks}
)(Users)