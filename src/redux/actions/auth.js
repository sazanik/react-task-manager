import {EDIT_AUTH_DATA, GET_AUTH_DATA} from "./types";

const getAuthData = async data => (
  {
    type: GET_AUTH_DATA,
    payload: data
  }
)

const editAuthData = (value, fieldName) => (
  {
    type: EDIT_AUTH_DATA,
    payload: {value, fieldName}
  })

export {getAuthData, editAuthData}




