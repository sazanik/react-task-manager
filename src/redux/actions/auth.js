import {GET_AUTH_DATA, EDIT_AUTH_DATA, ADMIN_SELECTED, IS_ERROR} from "./types";


export const isError = (check, text) => {
  return {
    type: IS_ERROR,
    payload: {check, text}
  }
}

export const getAuthData = data => {
  console.log('action get')
  return {
    type: GET_AUTH_DATA,
    payload: data
  }
}

export const editAuthData = (value, fieldName) => {
  return {
    type: EDIT_AUTH_DATA,
    payload: {value, fieldName}
  }
}

export const adminSelected = () => (
  {
    type: ADMIN_SELECTED
  }
)










