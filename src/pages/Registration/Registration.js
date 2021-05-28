import React, {useState, useEffect, useRef} from 'react'
import './Registration.css'
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import Button from "../../components/UI/Button/Button";
import {NavLink} from "react-router-dom";
import axios_ from "../../axios/axios";
import axios from "axios";
import classes from '../../components/UI/Select/Select.module.css'

function Registration() {

  const selectRole = useRef(null)

  const [list, setList] = useState({
    admins: [],
    users: []
  })

  const [selectAdmin, setSelectAdmin] = useState(false)
  const [formItems, setFormItems] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    repeatedPassword: '',
    role: 'admin'
  })

  // console.log('FORM', formItems)
  // console.log('LIST', list)

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
    if (e.target.value === 'admin') setSelectAdmin(true)
    else {setSelectAdmin(false)}
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

        <select
          ref={selectRole}
          name='select-role'
          defaultValue='select-role'
          className={classes.Select}
          onChange={(e) => changeInputsHandler(e, 'role')}
        >
          <option value='select-role' disabled>Select role</option>
          <option value='admin'>Administrator</option>
          <option value='user'>User</option>
        </select>

        {formItems.role === 'user'
          ? <Select
            onChange={(e) => setSelectAdmin(e.target.value)}
            defaultValue='Select your administrator'
            options={list.admins}
          />
          : null
        }

        <Button
          onClick={clickHandler}
          disabled={!formValidate() || selectRole.current.value === 'select-role' || !selectAdmin || checkPasswordMatch()}
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
