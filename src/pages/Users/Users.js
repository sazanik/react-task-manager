import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import './Users.css'
import {setAllowedUsersId, setCurrentUser, setUsers} from "../../redux/actions/auth";
import axios_ from "../../axios/axios";

function Users({setAllowedUsersId, setCurrentUser, setUsers}) {

  const admin = JSON.parse(localStorage.getItem('currentPerson'))
  const persons = JSON.parse(localStorage.getItem('personList'))
  const usersOfThisAdmin = persons.users.filter(user => user.yourAdmin === admin.email)
  const listUserId = []
  usersOfThisAdmin.forEach(user => listUserId.push(user.personId))

  const renderUsers = usersOfThisAdmin.map(user =>
    <li key={Math.random()}>
      <NavLink
        onClick={() => setCurrentUser(user)}
        to={`/todolist/${user.personId}`}
      >
        {`${user.email} (${user.name} ${user.surname})`}
      </NavLink>
    </li>)

  const fetchUsers = async () => {
    const res = await axios_.get('/todo.json')
    setUsers(res.data.users)
  }

  useEffect(() => {
    fetchUsers()
    setAllowedUsersId(listUserId)

    return () => {
      setAllowedUsersId(listUserId)
      fetchUsers()
    }
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
  {setAllowedUsersId, setCurrentUser, setUsers}
)(Users)