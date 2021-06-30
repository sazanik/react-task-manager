import React, {useEffect} from 'react'
import ColumnTaskList from '../../components/ColumnTaskList'
import './Todolist.css'
import {connect} from "react-redux";
import Loader from "../../components/Loader/Loader";
import axios_ from "../../axios/axios";
import {setId, setLoading, setUsers, deleteId} from "../../redux/actions/auth";
import {useParams, useLocation, useRouteMatch, useHistory} from "react-router-dom";
import {setTasks, clearLocalTasks} from "../../redux/actions/tasks";
import firebase from "firebase";


function Todolist({state, tasks, setTasks, setLoading, setId, clearLocalTasks, deleteId}) {


  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const db = firebase.database()

  const checkEmptyLocalTasks = () => {
    return tasks.green.length || tasks.yellow.length || tasks.red.length
  }


  const sendData = () => {
    db.ref().child(`todo/users/${Object.keys(params)[0]}/tasks`).get()
      .then((snapshot) => {
        console.log('SD: prev state db', snapshot.val())
        db.ref(`todo/users/${Object.keys(params)[0]}/tasks`)
          .set({...tasks})
          .then(() => {
          })
          .catch(e => console.log(e))
      })

  }

  const fetchTasks = () => {
    db.ref().child(`todo/users/${Object.keys(params)[0]}/tasks`).get()
      .then(snapshot => {
        if (snapshot.exists()) {
          const remoteTasks = snapshot.val()
          console.log('FT: get remoteTasks', remoteTasks)
          setTasks(remoteTasks)
        } else {
          console.log("FT: no data")
          setTasks({
            green: [],
            yellow: [],
            red: []
          })
        }
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    console.log('UE: setLoading & fetchTasks')
    fetchTasks()
  }, [])

  useEffect(() => {

    return () => {
      console.log('UER: sendData')
      console.log('UER: tasks', tasks)
      if (checkEmptyLocalTasks()) {
        sendData()
      }
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