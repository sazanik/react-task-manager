import React, {useState, useEffect} from 'react'
import './Registration.css'
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import {NavLink} from "react-router-dom";
import axios_ from "../../axios/axios";
import axios from "axios";

function Registration() {

  const [list, setList] = useState({
    admins: [],
    users: []
  })


  const [formItems, setFormItems] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatedPassword: '',
    role: 'admin'
  })

  console.log('FORM', formItems)
  console.log('LIST', list)

  useEffect(() => {
    axios_.get('/todo.json')
      .then(res => {
        if (res.status === 200) {
          setList(prev => ({...prev, admins: Object.values(res.data.admins)}))
        }
      }).catch(err => {
      console.log(err)
    })
  }, [])



  const formValidate = () => {
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

  const clickHandler = async () => {
    const authData = {
      email: formItems.email,
      password: formItems.password,
      returnSecureToken: true
    }

    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs', authData)
      const res_ = await axios_.post('/todo/admins.json', formItems)

      setFormItems({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatedPassword: '',
        role: 'admin'
      })

      console.log(res.data, res_.data)

    } catch (err) {
      console.error(err)
    }
  }


  return (
    <>
      <form
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
          type='email'
          placeholder='email'
          value={formItems.email}
          onChange={(e) => changeInputsHandler(e, 'email')}
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
          options={!list.admins.length
            ? [{value: 'admin', text: 'Admin'}]
            : [{value: 'admin', text: 'Admin'}, {value: 'user', text: 'User'}]}
          onChange={(e) => changeInputsHandler(e, 'role')}
        />
        {formItems.role === 'user' && !list.admins.length
          ? <Select
            value={formItems.role}
            options={list.admins}
            onChange={(e) => changeInputsHandler(e, 'role')}
          />
          : null
        }

        <Button
          onClick={clickHandler}
          disabled={!formValidate() || checkPasswordMatch()}
          type='button'
        >registration</Button>

        <span>or</span>
        <br/>
        <NavLink to='/login'>sign in</NavLink>
      </form>
    </>
  )
}

export default Registration
