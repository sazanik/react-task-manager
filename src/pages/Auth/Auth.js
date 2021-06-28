import React, {useEffect, useRef} from 'react'
import {useHistory} from "react-router-dom"
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {connect} from "react-redux"
import axios from "axios";
import axios_ from '../../axios/axios'
import firebase from "firebase";
import {
  editAuthData,
  isError,
  logout,
  setLoading,
  setIsLogin,
  setToken,
  setCurrentPerson,
  setPersonList,
  clearData
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
                setPersonList,
                clearData
              }) => {


  const history = useHistory()
  const selectRole = useRef(null)
  const selectAdmin = useRef(null)

  const db = firebase.database()


  useEffect(() => {

      console.log('FIREBASE', db,)

      db.ref('todo').on('value', snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          console.log('1 method', snapshot.val())
          setPersonList(data.admins, data.users)
        } else {
          console.log("No data available")
          db.ref('todo/').set({
            admins: '',
            users: ''
          }).catch(e => console.log(e))
        }
      })

      /* db.ref().child('todo').get()
         .then(snapshot => {
           if (snapshot.exists()) {
             console.log('2 method', snapshot.val())
           } else {
             console.log("No data available")
             db.ref('todo/').set({
               admins: '',
               users: ''
             }).catch(e => console.log(e))

           }
         }).catch(e => {
         console.error(e);
       });*/
      /* axios_.get('/todo.json')
         .then(res => {
           if (res.status === 200 && res.data) {
             const admins = Object.values(Object.values(res.data)[0])
             const users = Object.values(Object.values(res.data)[1])
             setPersonList({admins, users})

           }
         })
         .catch(err => {
           console.error(err)
         })*/

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

    if (fieldName === 'nickname' || fieldName === 'email') {
      editAuthData(e.target.value.trim().toLowerCase(), fieldName)
    } else editAuthData(e.target.value.trim(), fieldName)


    if (fieldName === 'role') {
      if (e.target.value === 'admin' || state?.personList?.admins?.length === 0) {
        return editAuthData(null, 'yourAdmin')
      } else if (e.target.value === 'user') {
        return editAuthData('', 'yourAdmin')
      }
    }
  }

  const checkPasswordMatch = () => {
    return state.password === state.repeatedPassword
  }

  const submit = e => {
    if (e.key !== 'Enter' && e.type !== 'click') return

    setLoading()

    if (state.isLogin) {
      firebase.auth().signInWithEmailAndPassword(state.email, state.password)
        .then(data => console.log(data))
        .catch(e => {
          isError(true, e.message)
          console.log(e)
        })
    } else {
      firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
        .then(data => console.log(data.user.refreshToken))
        .catch(e => {
          isError(true, e.message)
          console.log(e)
        })
    }



    firebase.auth().currentUser.getIdTokenResult(true)
      .then(data => {
        console.log(data)
        const expirationTime = new Date(data.expirationTime)
        const token = data.token

        console.log(token, expirationTime)

        setToken({token, expirationTime})

        const personData = {
          email: state.email,
          name: state.name,
          surname: state.surname,
          nickname: state.nickname,
          role: state.role,
          yourAdmin: state.yourAdmin
        }

        if (!state.isLogin && !isError.check && token) {
          db.ref(`todo/${state.role}s/${state.nickname}`).set(personData)
            .catch(e => console.log(e.message))
        }

        console.log('TUT')
        setCurrentPerson(currentPerson() || personData)
        clearData()

      })
      .catch(e => {
        isError(true, e.message)
        console.log(e)
      })


    /*const authData = {
      email: state.email,
      password: state.password,
      returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkyiEda2ju7--MlhENMnNc2FptD1UwKNk'

    if (state.isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkyiEda2ju7--MlhENMnNc2FptD1UwKNk'
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
          personId: data.localId,
          role: state.role,
          yourAdmin: state.yourAdmin
        }

        if (!state.isLogin && !isError.check && data.idToken) {

          await axios_.post(`/todo/${state.role}s.json`, personData)
        }

        setCurrentPerson(currentPerson() || personData)
        clearData()

      }
    } catch (err) {
      console.log(err)
      if (err?.response?.data) {
        isError(true, err.response.data.error.message)
      }
    }*/
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
          onKeyPress={submit}
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
          {state.isError?.check &&
          <span className='error'>{state.isError.text}</span>}

          <Button
            onClick={submit}
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
          onKeyPress={submit}
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
            type='text'
            placeholder='nickname'
            value={state.nickname}
            onChange={e => changeInputsHandler(e, 'nickname')}
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
            {state?.personList?.admins?.length
              ? <option value='user'>User</option>
              : null
            }
          </select>

          {state?.personList?.admins?.length && state.role === 'user'
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

          {state.isError?.check &&
          <span className='error'>{state.isError.text}</span>}

          <Button
            onClick={submit}
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
    setPersonList,
    clearData
  }
)(Auth)
