import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-todolist-1e6c4-default-rtdb.europe-west1.firebasedatabase.app/'
})