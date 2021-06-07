import axios_ from "axios";
import axios from "../../axios/axios";
import {useHistory} from "react-router-dom"
import {EDIT_AUTH_DATA, GET_AUTH_DATA, ADMIN_SELECTED} from "../actions/types";


const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatedPassword: '',
  role: '',
  yourAdmin: null,
  authData: null,
  isLogin: false,
  isError: false,
}
export default (state = initialState, action) => {
  console.log(action)

  const copyState = {...state}
  const {type, payload} = action

  switch (type) {

    case GET_AUTH_DATA:
      return getAuthData(copyState)

    case EDIT_AUTH_DATA:
      return editAuthData(copyState, payload)

    case ADMIN_SELECTED:
      return {
        copyState, yourAdmin: null
      }


    default:
      return copyState
  }
}

const getAuthData = async state => {
  console.log(state)

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
    const resAuth = await axios.post(url, authData)
    const resDB = await axios_.post(`/todo/${state.role}s.json`, inDataBase)


  } catch
    (err) {
    if (err.message.includes(400)) {
      state.isError = true
      return {...state}
    }
  }
  return state
}

const editAuthData = (state, payload) => {
  const {value, fieldName} = payload
  console.log('getAuthData', state, payload)


  state.isError = false
  state[fieldName] = value.trim()

  if (fieldName === 'role') {
    if (value === 'admin' || state.authData.admins.length === 0) {
      state.yourAdmin = null
      return {...state}
    } else if (value === 'user') {
      state.yourAdmin = ''
      return {...state}
    }
  }
  return state
}


