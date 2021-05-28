import React, {useState} from 'react'
import './Login.css'
import {NavLink} from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

function Login() {

  const [loginForm, setLoginForm] = useState({login: '', password: ''})

  const changeHandler = (e, fieldName) => {
    const copyState = {...loginForm}

    copyState[fieldName] = e.target.value.trim()
    setLoginForm(copyState)

    console.log(loginForm)
  }

  return (
    <form className='sign-in'>
      <h1>Login</h1>
      <hr/>
      <Input
        type='text'
        placeholder='login'
        value={loginForm.login}
        onChange={(e) => changeHandler(e, 'login')}
      />

      <Input
        type='password'
        placeholder='password'
        value={loginForm.password}
        onChange={(e) => changeHandler(e, 'password')}
      />

      <Button type='submit'>sign in</Button>
      <span>or</span>
      <br/>
      <NavLink to='/registration'>sign up</NavLink>
    </form>
  )
}

export default Login
