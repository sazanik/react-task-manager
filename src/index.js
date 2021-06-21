import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {state} from './redux/store'
import './index.css'
import App from './app/App'
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
  <Provider store={state}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)



