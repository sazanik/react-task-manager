import React, {useState, useEffect, useRef} from 'react'
import {useHistory} from "react-router-dom"
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {connect} from "react-redux"
import axios from "axios";
import axios_ from '../../axios/axios'
import {
  getAuthData,
  editAuthData,
  clearAuthData,
  isError,
  authSuccess,
  authLogout,
  setLoading,
  setIsLogin,
  setToken
} from "../../redux/actions/auth";

import './Auth.css'
import Loader from "../../components/Loader/Loader";

const Auth = ({
                state,
                getAuthData,
                isError,
                clearAuthData,
                editAuthData,
                authSuccess,
                authLogout,
                setLoading,
                setIsLogin,
                setToken,
              }) => {

  const history = useHistory()
  const selectRole = useRef(null)
  const selectAdmin = useRef(null)
  const [firstRender, setFirstRender] = useState(true)


  useEffect(() => {
      if (firstRender) {
        console.log('---1 RENDER_AUTH---')
        setFirstRender(false)
      }
      if (!firstRender) {
        console.log('---2 RENDER_AUTH---')
        console.log(state.token)
        axios_.get('/todo.json')
          .then(res => {
            if (res.status === 200 && res.data) {
              getAuthData(res.data)
            }
          })
          .catch(err => {
            console.error(err)
          })

        clearAuthData(state.isLogin, state.token)
        if (state.token) {
          history.push('/todolist')
        }

      }
    }, [firstRender, state.token, history, state.isLogin, getAuthData, clearAuthData, authLogout, setIsLogin, setToken]
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
      clearAuthData(state.isLogin, localStorage.getItem('token'))

      if (state.role === 'user' || state.isLogin) {
        history.push('/todolist')
      } else if (state.role === 'admin') {
        history.push('/users')
      }
    }
  }

  const sendAuthData = async state => {

    setLoading()

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

    if (state.isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'
    }

    try {
      const resDB = await axios_.get('/todo.json')
      if (resDB.status === 200 && resDB.data) {

        const data = (await axios.post(url, authData)).data
        console.log(data)
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        console.log(data, expirationDate)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        authSuccess(data.idToken)

        setTimeout(() => {
          setIsLogin(true)
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          localStorage.removeItem('expirationDate')
          authLogout()
          history.push('/')
        }, data.expiresIn * 1000)


        if (!state.isLogin && !isError.check && data.idToken) {
          await axios_.post(`/todo/${state.role}s.json`, inDataBase)
        }

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
    state.loading
      ?
      <Loader/>
      :
      state.isLogin
        ?
        <form className='Auth'>
          <h1>Login</h1>
          <hr/>
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
          {state.isError.check &&
          <span className='error'>{state.isError.text.toLowerCase().split('_').join(' ')}</span>}

          <Button
            onClick={sendRequest}
            disabled={!state.email || !state.password || state.password.length < 6}
            type='button'
          >login</Button>
          <span>or</span>
          <br/>
          <span className='toggle'
                onClick={() => setIsLogin(false)}
          >sign up
        </span>
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

          {state.isError.check &&
          <span className='error'>{state.isError.text.toLowerCase().split('_').join(' ')}</span>}

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
          <span className='toggle'
                onClick={() => {
                  state.role = ''
                  setIsLogin(true)
                }}
          >sign in
        </span>
        </form>
  )
}

export default connect(
  state => ({state: state.auth}),
  {getAuthData, clearAuthData, isError, editAuthData, authSuccess, authLogout, setLoading, setIsLogin, setToken}
)(Auth)
