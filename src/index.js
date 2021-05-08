import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from "./redux/store"
import './index.css'
import App from './app/App'
// import Sandbox from "./sandbox/Sandbox"


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)


/*//---SANDBOX---
ReactDOM.render(
  <Sandbox test='for sandbox'/>,
  document.getElementById('sandbox')
)*/


