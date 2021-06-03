import React, {useState, useEffect, useRef} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {NavLink} from 'react-router-dom'
import axios_ from '../../axios/axios'
import axios from 'axios'
import './Registration.css'


function Registration(props) {

  const selectRole = useRef(null)

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

  // console.log('FORM', formItems)
  // console.log('LIST', list)

  useEffect(() => {
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

  }, [])


  //----------------test
  const formValidate = () => {
    return ((formItems.password.length >= 6) && Object.values(formItems).every(item => item !== ''))
  }

  const changeInputsHandler = (e, fieldName) => {
    const state = {...formItems}
    state[fieldName] = e.target.value.trim()
    setFormItems(state)
    setIsError(false)
  }

  const changeSelectAdminHandler = e => {
    setFormItems(prevState => ({...prevState, yourAdmin: e.target.value}))
    console.log(formItems)
  }


  const checkPasswordMatch = () => {
    return formItems.password !== formItems.repeatedPassword
  }



  const sendRequest = async (role, value) => {

    if (role === 'user') {
      props.history.push('/todolist')
    } else {
      setFormItems(prevState => ({...prevState, yourAdmin: null}))
      props.history.push('/users')
    }

    const authData = {
      email: formItems.email,
      password: formItems.password,
      returnSecureToken: true
    }

    try {
      const resAuth = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs', authData)
      const resDB = await axios_.post(`/todo/${role}s.json`, formItems)

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

  const submit = async () => {

    await sendRequest(formItems.role)
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
      {checkPasswordMatch() && <span className='error'>password mismatch</span>}

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

      {formItems.role === 'user'
        ? <select
          className='Select'
          name='Select your admin'
          defaultValue='Select your admin'
          onChange={e => changeSelectAdminHandler(e)}
        >
          <option
            key={Math.random()}
            value='Select your admin'
            disabled
          >
            Select your admin
          </option>

          {list.admins.map((option, idx) => {
            return (
              <option
                key={Math.random() + idx}
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
        onClick={submit}
        disabled={
          !formValidate()
          || selectRole.current.value === 'select-role'
          || checkPasswordMatch()
        }
        type='button'
      >registration</Button>

      <span>or</span>
      <br/>
      <NavLink to='/login'>sign in</NavLink>
    </form>
  )
}

export default Registration
