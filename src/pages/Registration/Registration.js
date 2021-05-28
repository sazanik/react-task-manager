import React, {useState, useEffect} from 'react'
import './Registration.css'
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import {NavLink} from "react-router-dom";
import axios from "../../axios/axios";

function Registration() {

  const [roles, setRoles] = useState({
    admins: [],
    users: []
  })

  const [formItems, setFormItems] = useState({
    name: '',
    surname: '',
    login: '',
    password: '',
    repeatedPassword: '',
    role: 'admin'
  })


  useEffect(() => {
    axios.get('/todo.json')
      .then(res => {
        if(res.status === 200) {
          setRoles(prev => ({...prev, admins: res.data.admins}))
        }
    }).catch(err => {
      console.log(err)
    })

  }, [])

  const formValidate = () => {
    console.log(Object.values(formItems).every(item => item !== ''));
    return Object.values(formItems).every(item => item !== '')
  }

  const changeInputsHandler = (e, fieldName) => {
    const state = {...formItems}
    state[fieldName] = e.target.value.trim()
    setFormItems(state)
  }

  const checkPasswordMatch = () => {
    return formItems.password !== formItems.repeatedPassword
  }

  return (
    <>
      <form
        onChange={formValidate}
        onBlur={checkPasswordMatch}
        className='registration'>
        <h1>Registration</h1>
        <hr/>

        <Input
          type='text'
          placeholder='name'
          value={formItems.name}
          onChange={(e) => changeInputsHandler(e, 'name')}
        />

        <Input
          type='text'
          placeholder='surname'
          value={formItems.surname}
          onChange={(e) => changeInputsHandler(e, 'surname')}
        />

        <Input
          type='text'
          placeholder='login'
          value={formItems.login}
          onChange={(e) => changeInputsHandler(e, 'login')}
        />

        <Input
          type='password'
          placeholder='password'
          value={formItems.password}
          onChange={(e) => changeInputsHandler(e, 'password')}
        />

        {!formItems.password ||
        <Input
          type='password'
          placeholder='password again'
          value={formItems.repeatedPassword}
          onChange={(e) => changeInputsHandler(e, 'repeatedPassword')}
        />
        }
        {checkPasswordMatch() && <span className='error'>password mismatch</span>}


        <Select
          value={formItems.role}
          options={[{value: 'admin', text: 'Admin'}, {value: 'user', text: 'User'}]}
          onChange={(e) => changeInputsHandler(e, 'role')}
        />
        {formItems.role === 'user'
          ? <Select
            value={formItems.role}
            options={[{value: 'admin1', text: 'admin1'}, {value: 'admin2', text: 'admin2'}]}
            onChange={(e) => changeInputsHandler(e, 'admin')}
          />
          : null
        }

        <Button
          disabled={!formValidate() || checkPasswordMatch()}
          type='submit'
        >registration</Button>

        <span>or</span>
        <br/>
        <NavLink to='/login'>sign in</NavLink>
      </form>
    </>
  )
}

export default Registration
