import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {bank} from './redux/store'
import './index.css'
import App from './app/App'


ReactDOM.render(
  <Provider store={bank}>
    <App/>
  </Provider>,
  document.getElementById('root')
)



