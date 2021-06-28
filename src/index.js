import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {state} from './redux/store'
import './index.css'
import App from './app/App'
import {BrowserRouter} from "react-router-dom";
import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBkyiEda2ju7--MlhENMnNc2FptD1UwKNk",
  authDomain: "react-task-manager-1.firebaseapp.com",
  databaseURL: "https://react-task-manager-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-task-manager-1",
  storageBucket: "react-task-manager-1.appspot.com",
  messagingSenderId: "729599201713",
  appId: "1:729599201713:web:f88f74e1f33e75cd926d90"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <Provider store={state}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)



