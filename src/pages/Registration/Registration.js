import React, {useState, useEffect, useRef} from 'react'
import {useHistory} from "react-router-dom"
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import {getAuthData, sendAuthData, editAuthData, adminSelected} from "../../redux/actions/auth";
import './Registration.css'
import axios from "../../axios/axios";


const Registration = ({state, getAuthData, sendAuthData, editAuthData, adminSelected}) => {

  const history = useHistory()
  const selectRole = useRef(null)
  const selectAdmin = useRef(null)

  const [firstRender, setFirstRender] = useState(true)


  useEffect(() => {
      if (firstRender) return setFirstRender(false)
      console.log('-------1 RENDER---------')
      if (!firstRender) {

        axios.get('/todo.json')
          .then(res => {
            if (res.status === 200) {
              getAuthData(res.data)
            }
          })
          .catch(err => {
            console.log(err)
          })

        if (state.role === 'admin') {
          adminSelected()
        }
        console.log('-------2 RENDER---------')

      }
    },
    [firstRender]/*, [state.role, state.yourAdmin]*/
  )

// const formValidate = () => {
//   return ((state.password.length >= 6) && Object.values(state).every(item => item !== ''))
// }

  const changeInputsHandler = async (e, fieldName) => {
    editAuthData(e.target.value, fieldName)
  }


  const checkPasswordMatch = () => {
    return state.password === state.repeatedPassword
  }

  const sendRequest = () => {
    sendAuthData(state)

    if (state.role === 'user') {
      history.push('/todolist')
    } else if (state.role === 'admin') {
      history.push('/users')
    }
  }

  return (
    <form
      className='Registration'>
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

      {state.isError && <span className='error'>invalid email</span>}

      <Button
        onClick={sendRequest}
        disabled={!(
          // formValidate() &&
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
  {getAuthData, sendAuthData, editAuthData, adminSelected}
)(Registration)
