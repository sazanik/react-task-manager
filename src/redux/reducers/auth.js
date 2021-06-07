import {EDIT_AUTH_DATA, GET_AUTH_DATA} from "../actions/types";

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatedPassword: '',
  role: '',
  yourAdmin: null,
  authData: null,
  isLogin: false
}
export default (state = initialState, action) => {
  const copyState = {...state}
  const {type, payload} = action

  switch (type) {

    case GET_AUTH_DATA:
      return getAuthData(copyState, payload)


    case EDIT_AUTH_DATA:
      return {
        copyState
      }

    default:
      return copyState
  }
}


const getAuthData = (state, payload) => {
  console.log(state, payload)


  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'

  if (state.isLogin) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'
  }

  try {
    const resAuth = await axios.post(url, authData)
    const resDB = await axios_.post(`/todo/${formItems.role}s.json`, formItems)

//     if (formItems.role === 'user') {
//       history.push('/todolist')
//     } else if (formItems.role === 'admin') {
//       history.push('/users')
//       console.log(resAuth, resDB)
//     }
//   } catch
//     (err) {
//     if (err.message.includes(400)) setIsError(true)
//   }
// const authData = {
//   email,
//   password,
//   returnSecureToken: true
// }
// }
//