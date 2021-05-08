import {createStore} from 'redux'
import taskReducer from './reducers/taskReducer'

export const bank = createStore(taskReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

bank.subscribe(() => console.log('SUBSCRIBE', bank.getState()))


