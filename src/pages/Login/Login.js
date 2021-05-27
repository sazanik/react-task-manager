import React from 'react'
import './Login.css'
import {NavLink} from "react-router-dom";

function Login() {
  return (
    <>
      <form className='sign-in'>
        <h1>Login</h1>
        <hr/>
        <input className='sign-in__input' type="text" placeholder="Enter login" name="login" required/>
        <input className='sign-in__input' type="password" placeholder="Enter password" name="password" required/>
        <button type="submit" className="sign-in__button">Sign in</button>
        <span>or</span>
        <br/>
        <NavLink to='/registration'>sign up</NavLink>
      </form>
    </>
  )
}

export default Login
