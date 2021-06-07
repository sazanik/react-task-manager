import {EDIT_AUTH_DATA, GET_AUTH_DATA, ADMIN_SELECTED} from "./types";

export const getAuthData = async () => (
  {
    type: GET_AUTH_DATA,
  }
)

export const editAuthData = (value, fieldName) => (
  {
    type: EDIT_AUTH_DATA,
    payload: {value, fieldName}
  }
)

export const adminSelected = () => (
  {
    type: ADMIN_SELECTED
  }
)





