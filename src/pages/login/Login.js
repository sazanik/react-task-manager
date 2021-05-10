import React from 'react'
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div>
      <Link to='/registration'>Registration</Link>
      <br/>
      <Link to='/todolist'>Todolist</Link>
      <h1>Login page</h1>
    </div>
  )
}

export default Login
