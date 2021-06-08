import {GET_AUTH_DATA, EDIT_AUTH_DATA, SEND_AUTH_DATA, ADMIN_SELECTED, IS_ERROR} from "./types";
import axios from "../../axios/axios";
import axios_ from "axios";

export const isError = value => {
  return {
    type: IS_ERROR,
    payload: value
  }
}

export const getAuthData = data => {
  console.log('action get')
  return {
    type: GET_AUTH_DATA,
    payload: data
  }
}



export const editAuthData = (value, fieldName) => {
  return {
    type: EDIT_AUTH_DATA,
    payload: {value, fieldName}
  }
}

export const adminSelected = () => (
  {
    type: ADMIN_SELECTED
  }
)


export const sendAuthData = async state => {
  console.log('sendAuthData', state)

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
    console.log(resAuth.data, resDB.data)

  } catch
    (err) {
    if (err.message.includes(400)) {
      return isError(true)
    }
  }
}







