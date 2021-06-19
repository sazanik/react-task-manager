import {
  GET_AUTH_DATA,
  EDIT_AUTH_DATA,
  IS_ERROR,
  CLEAR_AUTH_DATA,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_LOADING,
  SET_IS_LOGIN,
  SET_TOKEN
} from "./types";


export const isError = (check, text) => {
  return {
    type: IS_ERROR,
    payload: {check, text}
  }
}

export const getAuthData = (data, isLogin) => {
  return {
    type: GET_AUTH_DATA,
    payload: {
      data,
      isLogin
    }
  }
}

export const editAuthData = (value, fieldName, yourAdmin) => {
  return {
    type: EDIT_AUTH_DATA,
    payload: {value, fieldName, yourAdmin}
  }
}

export const clearAuthData = (isLogin, token) => {
  return {
    type: CLEAR_AUTH_DATA,
    payload: {
      isLogin,
      token
    }
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









