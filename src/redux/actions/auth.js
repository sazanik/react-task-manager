import {GET_AUTH_DATA, EDIT_AUTH_DATA, IS_ERROR, CLEAR_AUTH_DATA, AUTH_SUCCESS, AUTH_LOGOUT, SET_LOADING} from "./types";


export const isError = (check, text) => {
  return {
    type: IS_ERROR,
    payload: {check, text}
  }
}

export const getAuthData = payload => {
  return {
    type: GET_AUTH_DATA,
    payload
  }
}

export const editAuthData = (value, fieldName, yourAdmin) => {
  return {
    type: EDIT_AUTH_DATA,
    payload: {value, fieldName, yourAdmin}
  }
}

export const clearAuthData = payload => {
  return {
    type: CLEAR_AUTH_DATA,
    payload
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











