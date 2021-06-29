import React, {useEffect, useState} from 'react'
import ColumnTaskList from '../../components/ColumnTaskList'
import './Todolist.css'
import {connect} from "react-redux";
import Loader from "../../components/Loader/Loader";
import axios_ from "../../axios/axios";
import {setId, setLoading, setUsers, deleteId} from "../../redux/actions/auth";
import {useParams, useLocation, useRouteMatch, useHistory} from "react-router-dom";
import {setTasks, clearLocalTasks} from "../../redux/actions/tasks";
import firebase from "firebase";


function Todolist({state, tasks, setTasks, setId, clearLocalTasks, deleteId}) {


  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const db = firebase.database()
  console.log(state)

  const sendData = () => {
    console.log('--------------SEND DATA-------------', Object.keys(params)[0])
    console.log()

    db.ref().child(`todo/users/${Object.keys(params)[0]}/tasks`).get()
      .then((snapshot) => {
        console.log('PREV STATE REMOTE DB', snapshot.val())
        db.ref(`todo/users/${Object.keys(params)[0]}/tasks`)
          .set({...tasks})
          .then(() => {
            // clearLocalTasks()
          })
          .catch(e => console.log(e))
      })
  }

  const fetchTasks = () => {
    console.log(params)
    db.ref().child(`todo/users/${Object.keys(params)[0]}/tasks`).get()
      .then(snapshot => {
        if (snapshot.exists()) {
          const remoteTasks = snapshot.val()
          console.log('REMOTE TASKS', remoteTasks)

          setTasks(remoteTasks)

        } else console.log("No data available")
      }).catch(e => console.log(e))
  }


  useEffect(() => {
    setLoading()
    fetchTasks()

  }, [history])

  useEffect(() => {
    return () => {
      sendData()
    }
  }, [tasks])

  return (
    state.loading
      ? <Loader/>
      :
      <>
        <ColumnTaskList box='green'/>
        <ColumnTaskList box='yellow'/>
        <ColumnTaskList box='red'/>
      </>
  )
}

export default connect(
  state => ({state: state.auth, tasks: state.tasks}),
  {setUsers, setId, setTasks, setLoading, clearLocalTasks, deleteId}
)(Todolist)