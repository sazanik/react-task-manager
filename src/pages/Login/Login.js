import React from 'react'
import {Link} from 'react-router-dom'
import './Login.css'

function Login() {
  return (
    <>
      <br/>
      <form className='sign-in' action='/'>
        <h1>Login</h1>
        <hr/>
        <input className='sign-in__input' type="text" placeholder="Enter login" name="login" required/>
        <input className='sign-in__input' type="password" placeholder="Enter password" name="password" required/>
        <button type="submit" className="sign-in__button">Sign in</button>
      </form>
    </>
  )
}

export default Login
