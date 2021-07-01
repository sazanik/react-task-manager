import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import './Users.css'
import {deleteId, setAllowedUsersId, setCurrentUser, setLoading, setUsers} from "../../redux/actions/auth";
import axios_ from "../../axios/axios";
import {clearLocalTasks} from "../../redux/actions/tasks";
import Input from "../../components/UI/Input/Input";

function Users({setLoading, state, setAllowedUsersId, setCurrentUser, setUsers, clearLocalTasks}) {

  const admin = JSON.parse(localStorage.getItem('currentPerson'))
  const persons = JSON.parse(localStorage.getItem('personList'))

  const [filteredUsers, setFilteredUsers] = useState(null)

  const usersOfThisAdmin = Object.values(persons?.users).filter(user => user.yourAdmin === admin.email)
  const listUserId = []
  usersOfThisAdmin.forEach(user => listUserId.push(user.nickname))

  const handleClick = user => {
    setLoading()
    setCurrentUser(user)
  }

  const filterUsers = (val, arr, method) => {
    console.log(val, arr)
    if (method === 'name') {
      return arr.filter(user => user.name.toLowerCase().includes(val) || user.surname.toLowerCase().includes(val))
    } else if (method === 'nickname') {
      return arr.filter(user => user.nickname.includes(val))

    }
  }

  const filterByName = e => {
    const val = e.target.value.toLowerCase()
    setFilteredUsers(filterUsers(val, usersOfThisAdmin, 'name'))
  }

  const filterByNickname = e => {
    const val = e.target.value.toLowerCase()
    setFilteredUsers(filterUsers(val, usersOfThisAdmin, 'nickname'))
  }


  const renderUsers = (filteredUsers || usersOfThisAdmin).map(user =>
    <li key={Math.random()}>
      <NavLink
        onClick={() => handleClick(user)}
        to={`/todolist/:${user.nickname}`}
      >
        {`${user.nickname} (${user.name} ${user.surname})`}
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
  }, [])

  useEffect(() => {
    clearLocalTasks()

  }, [state.currentUser])

  return (
    <div>
      <h1>Search user...</h1>
      <Input
        onChange={filterByNickname}
        placeholder='nickname'
      />
      <Input
        onChange={filterByName}
        placeholder='name or surname'
      />

      <ol
        className='users-list'
      >
        {renderUsers}
      </ol>
    </div>
  )
}

export default connect(
  (state) => ({state: state.auth, tasks: state.tasks}),
  {setLoading, deleteId, setAllowedUsersId, setCurrentUser, setUsers, clearLocalTasks}
)(Users)