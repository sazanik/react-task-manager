import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {state} from './redux/store'
import './index.css'
import App from './app/App'


ReactDOM.render(
  <Provider store={state}>
    <App/>
  </Provider>,
  document.getElementById('root')
)



