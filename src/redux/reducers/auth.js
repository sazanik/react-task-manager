import axios_ from "axios";
import axios from "../../axios/axios";
import {useHistory} from "react-router-dom"
import {EDIT_AUTH_DATA, GET_AUTH_DATA, ADMIN_SELECTED} from "../actions/types";

const history = useHistory()

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
      return getAuthData(copyState, payload)


    case EDIT_AUTH_DATA:
      return {
        copyState
      }

    case ADMIN_SELECTED:
      return {
        copyState, yourAdmin: null
      }


    default:
      return copyState
  }
}

const getAuthData = async (state, payload) => {
  console.log(state, payload)

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

    if (state.role === 'user') {
      history.push('/todolist')
    } else if (state.role === 'admin') {
      history.push('/users')
      console.log(resAuth, resDB)
    }
  } catch
    (err) {
    if (err.message.includes(400)) {
      return {...state, isError: true}
    }
  }

  return state
}