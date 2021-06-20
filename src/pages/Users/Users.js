import React from 'react'
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import  './Users.css'

function Users({state}) {
  const admin = JSON.parse(localStorage.getItem('currentPerson'))
  const users = JSON.parse(localStorage.getItem('personList'))
  const usersOfThisAdmin = users.users.filter(user => user.yourAdmin === admin.email)
  const renderUsers = usersOfThisAdmin.map(user => <li>{`${user.email} (${user.name} ${user.surname})`}</li>)

  const history = useHistory()

  return (
    <div>
      <h1>Select user...</h1>
      <ol
        className='users-list'
        onClick={() => history.push('/todolist')}>
        {renderUsers}
      </ol>
    </div>
  )
}

export default connect(
  (state) => ({state: state.auth})
)(Users)