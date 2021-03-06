import {
  EDIT_AUTH_DATA,
  IS_ERROR,
  SET_PERSON_LIST,
  LOGOUT,
  SET_LOADING,
  SET_IS_LOGIN,
  SET_TOKEN,
  SET_CURRENT_PERSON,
  SET_ALLOWED_USERS_ID,
  SET_CURRENT_USER, CLEAR_DATA, SET_USERS, SET_ID,
  DELETE_ID
} from "../actions/types";

const initialState = {
  name: '',
  surname: '',
  nickname: '',
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
  allowedUsersId: null,
  currentUser: null,
  currentPerson: null,
  users: null,
  id: null,
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

    case LOGOUT:
      return {
        ...initialState,
      }

    case SET_LOADING:
      return {
        ...copyState,
        loading: payload
      }

    case SET_IS_LOGIN:
      return {
        ...copyState,
        isLogin: payload
      }

    case SET_TOKEN:
      return {
        ...copyState,
        token: payload.token
      }

    case SET_CURRENT_PERSON:
      return {
        ...copyState,
        loading: false,
        currentPerson: payload
      }

    case SET_ALLOWED_USERS_ID:
      return {
        ...copyState,
        loading: false,
        allowedUsersId: payload
      }

    case SET_CURRENT_USER:
      return {
        ...copyState,
        // loading: false,
        currentUser: payload
      }

    case SET_USERS:
      return {
        ...copyState,
        loading: false,
        users: payload
      }

      case SET_ID:
      return {
        ...copyState,
        id: payload
      }

      case DELETE_ID:
      return {
        ...copyState,
        id: null
      }

    case CLEAR_DATA:
      return {
        ...copyState,
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatedPassword: '',
        role: '',
        yourAdmin: null,
      }

    default:
      return {...copyState}
  }
}



