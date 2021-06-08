import {EDIT_AUTH_DATA, IS_ERROR, ADMIN_SELECTED, GET_AUTH_DATA, CLEAR_AUTH_DATA} from "../actions/types";

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
  console.log(action)
  const copyState = {...state}
  const {type, payload} = action

  switch (type) {

    case GET_AUTH_DATA:
      return {
        ...copyState,
        authData: {
          admins: Object.values(payload.admins),
          users: Object.values(payload.users)
        }
      }

    case IS_ERROR:
      return {...copyState, isError: payload}

    case EDIT_AUTH_DATA:
      return {
        ...copyState,
        isError: false,
        [payload.fieldName]: payload.value,
      }

    case CLEAR_AUTH_DATA:
      return {
        ...initialState, authData: payload
      }


    default:
      console.log(copyState)
      return {...copyState}
  }
}



