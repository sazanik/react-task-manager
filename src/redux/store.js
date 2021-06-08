import {createStore} from 'redux'
import rootReducers from './reducers'

export const state = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

state.subscribe(() => console.log(state.getState().auth))
state.subscribe(() => console.log(state.getState().tasks))


