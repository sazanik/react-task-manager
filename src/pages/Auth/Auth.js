import React, {useState, useEffect, useRef} from 'react'
import {useHistory} from "react-router-dom"
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {connect} from "react-redux"
import axios from "axios";
import axios_ from '../../axios/axios'
import {
  editAuthData,
  isError,
  logout,
  setLoading,
  setIsLogin,
  setToken,
  setCurrentPerson,
  setPersonList
} from "../../redux/actions/auth";

import './Auth.css'
import Loader from "../../components/Loader/Loader";

const Auth = ({
                state,
                isError,
                editAuthData,
                logout,
                setLoading,
                setIsLogin,
                setToken,
                setCurrentPerson,
                setPersonList
              }) => {


  const history = useHistory()
  const selectRole = useRef(null)
  const selectAdmin = useRef(null)
  const token = localStorage.getItem('token')


  useEffect(() => {

      axios_.get('/todo.json')
        .then(res => {
          if (res.status === 200 && res.data) {
            const admins = Object.values(Object.values(res.data)[0])
            const users = Object.values(Object.values(res.data)[1])
            setPersonList({admins, users})
            localStorage.setItem('personList', JSON.stringify({admins, users}))
          }
        })
        .catch(err => {
          console.error(err)
        })

    }, []
  )

  const currentPerson = () => {
    for (let group in state.personList) {
      let current = state.personList[group].find(person => person.email === state.email)
      if (current) return current
    }
  }


  const formValidate = () => {
    return state.password.length > 5 && Object.values(state).every(item => item !== '')
  }

  const changeInputsHandler = async (e, fieldName) => {
    editAuthData(e.target.value.trim(), fieldName)

    if (fieldName === 'role') {
      if (e.target.value === 'admin' || state.personList.admins.length === 0) {
        return editAuthData(null, 'yourAdmin')
      } else if (e.target.value === 'user') {
        return editAuthData('', 'yourAdmin')
      }
    }
  }

  const checkPasswordMatch = () => {
    return state.password === state.repeatedPassword
  }

  const sendRequest = async e => {
    if (e.key !== 'Enter' && e.type !== 'click') return

    setLoading()

    const authData = {
      email: state.email,
      password: state.password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'

    if (state.isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'
    }

    try {
      const resDB = await axios_.get('/todo.json')
      if (resDB.status === 200 && resDB.data) {

        const data = (await axios.post(url, authData)).data
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        setToken({token: data.idToken, expirationDate})

        setTimeout(() => {
          setIsLogin(true)
          logout()
          history.push('/')
        }, data.expiresIn * 1000)

        const personData = {
          email: state.email,
          name: state.name,
          surname: state.surname,
          userId: data.localId,
          role: state.role,
          yourAdmin: state.yourAdmin
        }

        if (!state.isLogin && !isError.check && data.idToken) {

          await axios_.post(`/todo/${state.role}s.json`, personData)
        }

        setCurrentPerson(currentPerson() || personData)

      }
    } catch (err) {
      console.log(err)
      if (err) {
        isError(true, err.response.data.error.message)
      }
    }

    if (currentPerson() && currentPerson().role === 'admin' || state.role === 'admin') history.push('/users')
    else history.push('/todolist')
  }

  return (
    state.loading
      ?
      <Loader/>
      :
      state.isLogin
        ?
        <form
          className='Auth'
          onKeyPress={sendRequest}
        >
          <h1>LOGIN</h1>
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
          className='Auth'
          onKeyPress={sendRequest}
        >
          <h1>REGISTRATION</h1>
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

          {state.role === 'user' && state.personList.admins.length
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

              {state.personList.admins.map((option, idx) => {
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
  {
    isError,
    editAuthData,
    logout,
    setLoading,
    setIsLogin,
    setToken,
    setCurrentPerson,
    setPersonList
  }
)(Auth)
