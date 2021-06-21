import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import './Users.css'
import {setAllowedUsersId, setCurrentUserId} from "../../redux/actions/auth";

function Users({setAllowedUsersId, setCurrentUserId}) {

  const admin = JSON.parse(localStorage.getItem('currentPerson'))
  const persons = JSON.parse(localStorage.getItem('personList'))
  const usersOfThisAdmin = persons.users.filter(user => user.yourAdmin === admin.email)
  const listUserId = []
  usersOfThisAdmin.forEach(user => listUserId.push(user.personId))

  const renderUsers = usersOfThisAdmin.map(user =>
    <li key={Math.random()}>
      <NavLink
        onClick={() => setCurrentUserId(user.personId)}
        to={`/todolist/${user.personId}`}>{`${user.email} (${user.name} ${user.surname})`}
      </NavLink>
    </li>)

  useEffect(() => {
    setAllowedUsersId(listUserId)
    return () => {
      setAllowedUsersId(listUserId)
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
  {setAllowedUsersId, setCurrentUserId}
)(Users)