import {EDIT_AUTH_DATA, IS_ERROR, ADMIN_SELECTED, GET_AUTH_DATA} from "../actions/types";

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatedPassword: '',
  role: '',
  yourAdmin: null,
  authData: {admins: null, users: null},
  isLogin: false,
  isError: {
    check: false,
    text: null
  },
}

export default function authReducer(state = initialState, action) {
  const copyState = {...state}
  const {type, payload} = action

  switch (type) {

    case GET_AUTH_DATA:
      return {...copyState, authData: payload}

    case IS_ERROR:
      return {...copyState, isError: payload}

    case EDIT_AUTH_DATA:
      return {
        ...copyState,
        isError: false,
        [payload.fieldName]: payload.value
      }

    case ADMIN_SELECTED:
      return {...copyState, yourAdmin: null}

    default:
      console.log(copyState)
      return {...copyState}
  }
}


const editAuthData = (state, payload) => {

  const {value, fieldName} = payload

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


