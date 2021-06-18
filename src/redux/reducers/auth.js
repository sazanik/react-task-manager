import {
  EDIT_AUTH_DATA,
  IS_ERROR,
  GET_AUTH_DATA,
  CLEAR_AUTH_DATA,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_LOADING,
  SET_IS_LOGIN, SET_TOKEN
} from "../actions/types";

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatedPassword: '',
  role: '',
  yourAdmin: null,
  authData: {admins: null, users: null},
  isError: {
    check: false,
    text: null
  },
  isLogin: false,
  loading: true,
  token: null,
}

export default function authReducer(state = initialState, action) {
  console.log(action)
  const copyState = {...state}
  const {type, payload} = action

  switch (type) {

    case GET_AUTH_DATA:
      return {
        ...copyState,
        loading: false,
        authData: {
          admins: Object.values(payload.admins),
          users: Object.values(payload.users)
        }
      }

    case IS_ERROR:
      return {
        ...copyState,
        isError: payload,
        loading: false,
        email: '',
        password: '',
        repeatedPassword: '',
      }

    case EDIT_AUTH_DATA:
      return {
        ...copyState,
        isError: false,
        [payload.fieldName]: payload.value,
      }

    case CLEAR_AUTH_DATA:
      return {
        ...initialState,
        isLogin: payload.isLogin,
        token: payload.token
      }

    case AUTH_SUCCESS:
      return {
        ...copyState, token: payload
      }

    case AUTH_LOGOUT:
      return {
        ...copyState,
        token: null,
      }

    case SET_LOADING:
      return {
        ...copyState,
        loading: true
      }

    case SET_IS_LOGIN:
      return {
        ...copyState,
        isLogin: payload
      }

    case SET_TOKEN:
      return {
        ...copyState,
        token: payload
      }

    default:
      console.log(copyState)
      return {...copyState}
  }
}



