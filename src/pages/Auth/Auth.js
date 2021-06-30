import React, {useEffect, useRef} from 'react'
import {useHistory} from "react-router-dom"
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {connect} from "react-redux"
import firebase from "firebase";
import axios_ from "../../axios/axios";
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
          console.log(snapshot)
          const data = snapshot.val()
          console.log('PERSONS LIST', data)

          setPersonList(data)

        } else {
          console.log("No data available")
          db.ref('todo/').set({
            admins: '',
            users: ''
          }).catch(err => {
            console.log(err)
            isError(true, err.message)
          })
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
       });
       axios_.get('/todo.json')
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
      const current = Object.values(state.personList[group]).find(person => {
        return person.email === state.email
      })
      if (current) {
        console.log('CURRENT', current)
        return current
      }
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


  const handleKeyPress = e => {
    if (e.key === 'Enter' && e.type === 'keypress' && state.password.length > 5 &&  state.email) submit()
  }


  const submit = () => {


    setLoading()

    if (state.isLogin) {
      firebase.auth().signInWithEmailAndPassword(state.email, state.password)
        .then((res) => {
          getToken()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          isError(true, err.message)
        })
    } else {
      firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
        .then((res) => {
          getToken()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          isError(true, err.message)
        })
        .catch(err => {
          console.log(err)
          isError(true, err.message)
        })
    }

    function getToken() {

      axios_.get('/todo.json').then((res) => {
        if ((res.status === 200 && res.data)) {
          console.log('AXIOS REQUEST',res)
          firebase.auth().currentUser.getIdTokenResult(true)
            .then(data => {
              console.log(data)
              const expirationTime = new Date(data.expirationTime)
              const token = data.token

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
                  .catch(err => {
                    console.log(err)
                    isError(true, err.message)
                  })
              }
              setCurrentPerson(currentPerson() || personData)
              clearData()
            })
        }
      }).catch(err => {
        console.log(err)
        isError(true, err.message)
      })
    }
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
          onKeyPress={handleKeyPress}
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
          onKeyPress={handleKeyPress}
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
            {Object.values(state?.personList?.admins).length
              ? <option value='user'>User</option>
              : null
            }
          </select>

          {Object.values(state.personList.admins).length && state.role === 'user'
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

              {Object.values(state.personList.admins).map((option, idx) => {
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
