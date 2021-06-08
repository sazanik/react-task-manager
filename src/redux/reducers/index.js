import {combineReducers} from 'redux'
import tasksReducer from './tasks'
import authReducer from "./auth";
import memoReducer from './memo'

export default combineReducers({memo: memoReducer, tasks: tasksReducer, auth: authReducer })