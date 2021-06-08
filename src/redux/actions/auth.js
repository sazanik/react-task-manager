import {GET_AUTH_DATA, EDIT_AUTH_DATA, SEND_AUTH_DATA, ADMIN_SELECTED} from "./types";


export const getAuthData = () => (
  {
    type: GET_AUTH_DATA
  }
)


export const sendAuthData = () => (
  {
    type: SEND_AUTH_DATA,
  }
)

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







