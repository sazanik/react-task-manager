import {createStore} from 'redux'
import rootReducers from './reducers'

export const bank = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

bank.subscribe(() => console.log('SUBSCRIBE', bank.getState()))


