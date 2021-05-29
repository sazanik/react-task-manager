import React, {useState} from 'react'
import './Login.css'
import {NavLink} from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import axios from "axios";

function Login(props) {

  const [isError, setIsError] = useState(false)
  const [formItems, setFormItems] = useState({
    email: '',
    password: '',
  })

  const formValidate = () => {
    return Object.values(formItems).every(item => item !== '')
  }

  const changeHandler = (e, fieldName) => {
    const copyState = {...formItems}
    copyState[fieldName] = e.target.value.trim()
    setFormItems(copyState)
    setIsError(false)
    console.log(formItems)
  }

  const clickHandler = async () => {
    const authData = {
      email: formItems.email,
      password: formItems.password,
      returnSecureToken: true
    }
    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs', authData)

      setFormItems({
        email: '',
        password: '',
      })

      props.history.push('/users')
      console.log(res.data)

    } catch (err) {
      if (err.message.includes(400)) setIsError(true)
    }
  }


  return (
    <form className='sign-in'>
      <h1>Login</h1>
      <hr/>
      <Input
        type='email'
        placeholder='email'
        value={formItems.email}
        onChange={(e) => changeHandler(e, 'email')}
      />

      <Input
        type='password'
        placeholder='password'
        value={formItems.password}
        onChange={(e) => changeHandler(e, 'password')}
      />

      {isError && <span className='error'>incorrect data</span>}


      <Button
        onClick={clickHandler}
        disabled={!formValidate()}
        type='button'
      >sign in</Button>
      <span>or</span>
      <br/>
      <NavLink to='/registration'>sign up</NavLink>
    </form>
  )
}

export default Login
