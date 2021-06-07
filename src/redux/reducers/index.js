import {combineReducers} from 'redux'
import tasksReducer from './tasks'
import authReducer from './auth'
import inputValue from './inputValue'

export default combineReducers({inputValue, tasks: tasksReducer, auth: authReducer })