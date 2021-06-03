import React, {useState, useEffect, useRef} from 'react'
import {useHistory} from "react-router-dom"
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {NavLink} from 'react-router-dom'
import axios_ from '../../axios/axios'
import axios from 'axios'
import './Registration.css'


function Registration() {

  const history = useHistory()
  const selectRole = useRef(null)
  const selectAdmin = useRef(null)

  const [firstRender, setFirstRender] = useState(true)
  const [isError, setIsError] = useState(false)

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
    role: '',
    yourAdmin: null
  })

  useEffect(() => {
    if (firstRender) return setFirstRender(false)
    console.log('-------1 RENDER---------')
    if (!firstRender) {

      axios_.get('/todo.json')
        .then(res => {
          if (res.status === 200) {
            setList(prev => (
              {
                ...prev,
                admins: Object.values(res.data.admins),
                users: Object.values(res.data.users)
              }))
          }
        }).catch(err => {
        console.log(err)
      })
      console.log('-------2 RENDER---------')

      if (formItems.role === 'admin') {
        setFormItems(prevState => ({...prevState, yourAdmin: null}))
      }
    }
  }, [formItems.role, formItems.yourAdmin])

  const formValidate = () => {
    return ((formItems.password.length >= 6) && Object.values(formItems).every(item => item !== ''))
  }

  const changeInputsHandler = (e, fieldName) => {
    console.log(e.target.value, fieldName)
    const state = {...formItems}
    state[fieldName] = e.target.value.trim()
    if (fieldName === 'role') {
      if (e.target.value === 'admin' || list.admins.length === 0) state.yourAdmin = null
      else if (e.target.value === 'user') state.yourAdmin = ''
    }
    setFormItems(state)
    setIsError(false)
  }

  const checkPasswordMatch = () => {
    return formItems.password === formItems.repeatedPassword
  }

  const sendRequest = async () => {
    const authData = {
      email: formItems.email,
      password: formItems.password,
      returnSecureToken: true
    }

    try {
      const resAuth = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs', authData)
      const resDB = await axios_.post(`/todo/${formItems.role}s.json`, formItems)

      if (formItems.role === 'user') {
        history.push('/todolist')
      } else if (formItems.role === 'admin') {
        history.push('/users')
      }

      setFormItems({
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatedPassword: '',
        role: '',
        yourAdmin: null
      })

      console.log(resAuth, resDB)

    } catch (err) {
      if (err.message.includes(400)) setIsError(true)
    }
  }

  console.log(formItems)

  return (
    <form
      className='Registration'>
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
      {checkPasswordMatch() || <span className='error'>password mismatch</span>}

      <select
        className='Select'
        ref={selectRole}
        name='select-role'
        defaultValue='select-role'
        onChange={e => changeInputsHandler(e, 'role')}
      >
        <option value='select-role' disabled>Select role</option>
        <option value='admin'>Administrator</option>
        <option value='user'>User</option>
      </select>

      {formItems.role === 'user' && list.admins.length
        ? <select
          className='Select'
          ref={selectAdmin}
          name='Select your admin'
          defaultValue='Select your admin'
          onChange={e => changeInputsHandler(e, 'yourAdmin')}
        >
          <option
            value='Select your admin'
            disabled
          >
            Select your admin
          </option>

          {list.admins.map((option, idx) => {
            return (
              <option
                key={idx}
                value={option.email}
              >
                {`${option.name} ${option.surname || ''}`}
              </option>
            )
          })}
        </select>
        : null
      }

      {isError && <span className='error'>invalid email</span>}

      <Button
        onClick={sendRequest}
        disabled={!(
          formValidate()
          && checkPasswordMatch()
          && formItems.role
        )}
        type='button'
      >registration</Button>

      <span>or</span>
      <br/>
      <NavLink to='/login'>sign in</NavLink>
    </form>
  )
}

export default Registration
