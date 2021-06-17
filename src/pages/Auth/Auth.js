import React, {useState, useEffect, useRef} from 'react'
import {useHistory} from "react-router-dom"
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import axios from "axios";
import axios_ from '../../axios/axios'
import {getAuthData, editAuthData, clearAuthData, isError} from "../../redux/actions/auth";

import './Auth.css'


const Auth = ({state, getAuthData, isError, clearAuthData, editAuthData}) => {

  const [isLogin, setIsLogin] = useState(false)
  const history = useHistory()
  const selectRole = useRef(null)
  const selectAdmin = useRef(null)

  const [firstRender, setFirstRender] = useState(true)


  useEffect(() => {
      if (firstRender) return setFirstRender(false)

      console.log('-------1 RENDER---------')
      if (!firstRender) {

        axios_.get('/todo.json')
          .then(res => {
            if (res.status === 200 && res.data) {
              getAuthData(res.data)
            }
          })
          .catch(err => {
            console.error(err)
          })
        console.log('-------2 RENDER---------')
      }
    }, [state.role, getAuthData, state.yourAdmin, firstRender]
  )

  const formValidate = () => {
    return state.password.length > 5 && Object.values(state).every(item => item !== '')
  }

  const changeInputsHandler = async (e, fieldName) => {
    editAuthData(e.target.value.trim(), fieldName)

    if (fieldName === 'role') {
      if (e.target.value === 'admin' || state.authData.admins.length === 0) {
        return editAuthData(null, 'yourAdmin')
      } else if (e.target.value === 'user') {
        return editAuthData('', 'yourAdmin')
      }
    }
  }

  const checkPasswordMatch = () => {
    return state.password === state.repeatedPassword
  }

  const sendRequest = async () => {

    if (await sendAuthData(state)) {
      clearAuthData()

      if (state.role === 'user') {
        history.push('/todolist')
      } else if (state.role === 'admin') {
        history.push('/users')
      }
    }
  }

  const sendAuthData = async state => {

    const authData = {
      email: state.email,
      password: state.password,
      returnSecureToken: true
    }

    const inDataBase = {
      name: state.name,
      surname: state.surname,
      email: state.email,
      password: state.password,
      role: state.role,
      yourAdmin: state.yourAdmin
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'

    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'
    }

    try {
      const resDB = await axios_.get('/todo.json')
      if (resDB.status === 200 && resDB.data) {
        await axios.post(url, authData)
        await axios_.post(`/todo/${state.role}s.json`, inDataBase)
        return true
      }
    } catch
      (err) {
      if (err) {
        console.log(err)
        isError(true, err.response.data.error.message)
      }
    }
  }

  return (
    isLogin
      ?
      <form className='Auth'>
        <h1>Login</h1>
        <hr/>
        <Input
          type='email'
          placeholder='email'
        />

        <Input
          type='password'
          placeholder='password'
        />
        {state.isError.check && <span className='error'>{state.isError.text.toLowerCase().split('_').join(' ')}</span>}

        <Button
          type='button'
        >sign in</Button>
        <span>or</span>
        <br/>
        <NavLink to='/registration'>sign up</NavLink>
      </form>

      :
      <form
        className='Auth'>
        <h1>Registration</h1>
        <hr/>

        <Input
          type='text'
          placeholder='name'
          value={state.name}
          onChange={e => changeInputsHandler(e, 'name')}
        />

        <Input
          type='text'
          placeholder='surname'
          value={state.surname}
          onChange={e => changeInputsHandler(e, 'surname')}
        />

        <Input
          type='email'
          placeholder='email'
          value={state.email}
          onChange={e => changeInputsHandler(e, 'email')}
        />

        <Input
          type='password'
          placeholder='password'
          value={state.password}
          onChange={e => changeInputsHandler(e, 'password')}
        />

        {!state.password ||
        <Input
          type='password'
          placeholder='password again'
          value={state.repeatedPassword}
          onChange={e => changeInputsHandler(e, 'repeatedPassword')}
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

        {state.role === 'user' && state.authData.admins.length
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

            {state.authData.admins.map((option, idx) => {
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

        {state.isError.check && <span className='error'>{state.isError.text.toLowerCase().split('_').join(' ')}</span>}

        <Button
          onClick={sendRequest}
          disabled={!(
            formValidate() &&
            checkPasswordMatch() &&
            state.role
          )}
          type='button'
        >registration</Button>

        <span>or</span>
        <br/>
        <NavLink to='/login'>sign in</NavLink>
      </form>
  )
}

export default connect(
  state => ({state: state.auth}),
  {getAuthData, clearAuthData, isError, editAuthData}
)(Auth)
