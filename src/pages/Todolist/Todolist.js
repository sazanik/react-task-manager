import React, {useEffect} from 'react'
import ColumnTaskList from '../../components/ColumnTaskList'
import './Todolist.css'
import {connect} from "react-redux";
import Loader from "../../components/Loader/Loader";
import {setId, setLoading, setUsers, deleteId} from "../../redux/actions/auth";
import {useParams} from "react-router-dom";
import {setTasks, clearLocalTasks} from "../../redux/actions/tasks";
import firebase from "firebase";


function Todolist({state, tasks, setTasks, setLoading}) {

  const params = useParams()


  const db = firebase.database()


  const checkedTasks = value => {
    const boxes = Object.keys(value)
    const copyTasks = {...value}
    if (!boxes.includes('green')) copyTasks.green = []
    if (!boxes.includes('yellow')) copyTasks.yellow = []
    if (!boxes.includes('red')) copyTasks.red = []
    setTasks(copyTasks)
  }


  const sendData = () => {
    db.ref().child(`todo/users/${Object.keys(params)[0]}/tasks`).get()
      .then((snapshot) => {
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
          checkedTasks(remoteTasks)
          setLoading(false)
        } else {
          checkedTasks(tasks)
          setLoading(false)
        }
      })
      .catch(e => console.log(e))

  }

  useEffect(() => {
    setLoading()
    fetchTasks()
  }, [])

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