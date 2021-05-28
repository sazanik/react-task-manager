import React, {useState} from 'react'
import './Registration.css'
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import {NavLink} from "react-router-dom";

function Registration() {

  const admins = [
    {value: 'default', text: 'Select your admin'},
    {value: 'admin1', text: 'Admin 1'},
    {value: 'admin2', text: 'Admin 2'},
    {value: 'admin3', text: 'Admin 3'},
    {value: 'admin4', text: 'Admin 4'},

  ]

  const roles = [
    {value: 'default', text: 'Select role'},
    {value: 'admin', text: 'Admin'},
    {value: 'user', text: 'User'},
  ]

  const [registerForm, setRegisterForm] = useState({
    name: '',
    surname: '',
    login: '',
    password: '',
    repeatedPassword: '',
    role: 'admin',
    admin: ''
  })

  const changeHandler = (e, fieldName) => {
    const copyState = {...registerForm}

    copyState[fieldName] = e.target.value.trim()
    setRegisterForm(copyState)

    console.log(registerForm)
  }

  return (
    <>
      <form className='registration'>
        <h1>Registration</h1>
        <hr/>

        <Input
          type='text'
          placeholder='name'
          value={registerForm.name}
          onChange={(e) => changeHandler(e, 'name')}
        />

        <Input
          type='text'
          placeholder='surname'
          value={registerForm.surname}
          onChange={(e) => changeHandler(e, 'surname')}
        />

        <Input
          type='text'
          placeholder='login'
          value={registerForm.login}
          onChange={(e) => changeHandler(e, 'login')}
        />

        <Input
          type='password'
          placeholder='password'
          value={registerForm.password}
          onChange={(e) => changeHandler(e, 'password')}
        />

        <Input
          type='password'
          placeholder='password again'
          value={registerForm.repeatedPassword}
          onChange={(e) => changeHandler(e, 'repeatedPassword')}
        />

        <Select
          value={registerForm.role}
          options={roles}
          onChange={(e) => changeHandler(e, 'role')}
        />
        {registerForm.role === 'admin'
          ? null
          :
          <Select
            value={registerForm.role}
            options={admins}
            onChange={(e) => changeHandler(e, 'role')}
          />}


        <Button type='submit'>registration</Button>
        <span>or</span>
        <br/>
        <NavLink to='/login'>sign in</NavLink>
      </form>
    </>
  )
}

export default Registration
