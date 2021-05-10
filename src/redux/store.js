import {createStore} from 'redux'
import reducer from './reducers/reducer'

export const bank = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

bank.subscribe(() => console.log('SUBSCRIBE', bank.getState()))


