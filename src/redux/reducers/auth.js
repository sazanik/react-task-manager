import {
  EDIT_AUTH_DATA,
  IS_ERROR,
  SET_PERSON_LIST,
  CLEAR_AUTH_DATA,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_LOADING,
  SET_IS_LOGIN,
  SET_TOKEN,
  SET_CURRENT_USER
} from "../actions/types";

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatedPassword: '',
  role: '',
  yourAdmin: null,
  personList: {admins: null, users: null},
  isError: {
    check: false,
    text: null
  },
  currentUser: null,
  isAdmin: null,
  token: null,
  isLogin: true,
  loading: true,
}

export default function authReducer(state = initialState, action) {
  console.log(action)
  const copyState = {...state}
  const {type, payload} = action

  switch (type) {

    case SET_PERSON_LIST:
      return {
        ...copyState,
        loading: false,
        personList: {
          admins: payload.admins,
          users: payload.users
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

    case SET_CURRENT_USER:
      return {
        ...copyState,
        currentUser: payload
      }

    default:
      console.log(copyState)
      return {...copyState}
  }
}



