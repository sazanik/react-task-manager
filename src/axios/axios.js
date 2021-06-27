import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-task-manager-1-default-rtdb.europe-west1.firebasedatabase.app/',
  responseType: 'json'
})