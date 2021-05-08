import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {createStore} from 'redux'

import './index.css'
import App from './app/App'

// import Sandbox from "./sandbox/Sandbox"


const addTask = (state = [], action) => {
  console.log(action)
  if (action.type === 'ADD_TASK') return [...state, action.payload]
  return state
}

const store = createStore(addTask)

store.subscribe(() => console.log('SUBSCRIBE', store.getState()))

store.dispatch({type: 'ADD_TASK', payload: 'run'})

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)

/*ReactDOM.render(
  <React.StrictMode>v
    <Sandbox/>
  </React.StrictMode>,
  document.getElementById('sandbox')
)*/

