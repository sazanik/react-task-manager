import {GET_AUTH_DATA, EDIT_AUTH_DATA, ADMIN_SELECTED, IS_ERROR, CLEAR_AUTH_DATA} from "./types";


export const isError = (check, text) => {
  return {
    type: IS_ERROR,
    payload: {check, text}
  }
}

export const getAuthData = data => {
  return {
    type: GET_AUTH_DATA,
    payload: data
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











