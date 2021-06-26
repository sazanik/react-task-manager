import {
  SET_PERSON_LIST,
  EDIT_AUTH_DATA,
  IS_ERROR,
  LOGOUT,
  SET_LOADING,
  SET_IS_LOGIN,
  SET_TOKEN,
  SET_CURRENT_PERSON,
  SET_ALLOWED_USERS_ID,
  SET_CURRENT_USER,
  CLEAR_DATA, SET_USERS, SET_ID,
  DELETE_ID
} from "./types";


export const isError = (check, text) => {
  return {
    type: IS_ERROR,
    payload: {check, text}
  }
}

export const editAuthData = (value, fieldName, yourAdmin) => {
  return {
    type: EDIT_AUTH_DATA,
    payload: {value, fieldName, yourAdmin}
  }
}

export const logout = () => {
  localStorage.clear()
  return {
    type: LOGOUT,
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}

export const setToken = payload => {
  localStorage.setItem('token', payload.token)
  localStorage.setItem('expirationDate', payload.expirationDate)
  return {
    type: SET_TOKEN,
    payload
  }
}

export const setIsLogin = payload => {
  return {
    type: SET_IS_LOGIN,
    payload
  }
}

export const setCurrentPerson = payload => {
  localStorage.setItem('currentPerson', JSON.stringify(payload))
  return {
    type: SET_CURRENT_PERSON,
    payload
  }
}

export const setPersonList = payload => {
  return {
    type: SET_PERSON_LIST,
    payload
  }
}

export const setAllowedUsersId = payload => {
  return {
    type: SET_ALLOWED_USERS_ID,
    payload
  }
}

export const setCurrentUser = payload => {
  return {
    type: SET_CURRENT_USER,
    payload
  }
}

export const clearData = () => {
  return {
    type: CLEAR_DATA
  }
}

export const setUsers = payload => {
  return {
    type: SET_USERS,
    payload
  }
}
export const setId = payload => {
  localStorage.setItem('id', payload)
  return {
    type: SET_ID,
    payload
  }
}

export const deleteId = () => {
  return {
    type: DELETE_ID
  }
}











