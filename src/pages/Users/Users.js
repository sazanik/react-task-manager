import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import './Users.css'
import {deleteId, setAllowedUsersId, setCurrentUser, setLoading, setUsers} from "../../redux/actions/auth";
import axios_ from "../../axios/axios";
import {clearLocalTasks} from "../../redux/actions/tasks";

function Users({setLoading, deleteId, setAllowedUsersId, setCurrentUser, setUsers, clearLocalTasks}) {

  const location = useLocation()

  const admin = JSON.parse(localStorage.getItem('currentPerson'))
  const persons = JSON.parse(localStorage.getItem('personList'))
  console.log()
  const usersOfThisAdmin = Object.values(persons.users).filter(user => user.yourAdmin === admin.email)
  const listUserId = []


  const handleClick = (user) => {
    setCurrentUser(user)
  }
  usersOfThisAdmin.forEach(user => listUserId.push(user.nickname))

  const renderUsers = usersOfThisAdmin.map(user =>
    <li key={Math.random()}>
      <NavLink
        onClick={() => handleClick(user)}
        to={`/todolist/${user.nickname}`}
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

  return (
    <div>
      <h1>Select user...</h1>
      <ol
        className='users-list'
      >
        {renderUsers}
      </ol>
    </div>
  )
}

export default connect(
  (state) => ({state: state.auth}),
  {setLoading, deleteId, setAllowedUsersId, setCurrentUser, setUsers, clearLocalTasks}
)(Users)