import {createStore} from 'redux'
import taskReducer from './reducers/taskReducer'
import {addTask} from "./actions/taskAction"

export const store = createStore(taskReducer)

store.subscribe(() => console.log('SUBSCRIBE', store))

store.dispatch(addTask('home', 'green'))
store.dispatch(addTask('home', 'green'))
store.dispatch(addTask('home', 'green'))
store.dispatch(addTask('home', 'green'))

console.log(store.getState())