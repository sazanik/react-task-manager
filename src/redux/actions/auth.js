import axios from "axios";
import axios_ from "../../axios/axios";

const auth = async (email, password, isLogin) => {
  const authData = {
    email: formItems.email,
    password: formItems.password,
    returnSecureToken: true
  }

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'

  if (isLogin) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBU4PdTwlQSYX8o2O4BfoDxQQzz5jHWBhs'
  }

  try {
    const resAuth = await axios.post(url, authData)
    const resDB = await axios_.post(`/todo/${formItems.role}s.json`, formItems)

    if (formItems.role === 'user') {
      history.push('/todolist')
    } else if (formItems.role === 'admin') {
      history.push('/users')
      console.log(resAuth, resDB)
    }
  } catch
    (err) {
    if (err.message.includes(400)) setIsError(true)
  }
}