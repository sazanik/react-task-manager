import {combineReducers} from 'redux'
import tasks from './tasks'
import inputValue from './inputValue'

export default combineReducers({inputValue, reducer: tasks})