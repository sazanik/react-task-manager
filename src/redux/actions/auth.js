import {
  SET_PERSON_LIST,
  EDIT_AUTH_DATA,
  IS_ERROR,
  CLEAR_AUTH_DATA,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_LOADING,
  SET_IS_LOGIN,
  SET_TOKEN,
  SET_CURRENT_USER,
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

export const clearAuthData = () => {
  return {
    type: CLEAR_AUTH_DATA,
  }
}

export const authSuccess = payload => {
  return {
    type: AUTH_SUCCESS,
    payload
  }
}

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING,
  }
}

export const setToken = payload => {
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

export const setCurrentUser = payload => {
  return {
    type: SET_CURRENT_USER,
    payload
  }
}

export const setPersonList = payload => {
  return {
    type: SET_PERSON_LIST,
    payload
  }
}









