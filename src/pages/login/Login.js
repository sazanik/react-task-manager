import React from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <>
      {/*<Link to='/registration'>Registration</Link>*/}
      {/*<br/>*/}
      {/*<Link to='/todolist'>Todolist</Link>*/}
      <form className='sign-in' action='/'>
        <h1>Login</h1>
        <hr/>
        <input className='sign-in__input' type="text" placeholder="Enter login" name="login" required/>
        <input className='sign-in__input' type="password" placeholder="Enter password" name="password" required/>
        <Link to='/todolist'>
          <button type="submit" className="sign-in__button">Sign in</button>
        </Link>
      </form>
    </>
  )
}

export default Login
