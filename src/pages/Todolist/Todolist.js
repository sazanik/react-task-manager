import React, {useEffect} from 'react'
import ColumnTaskList from '../../components/ColumnTaskList'
import './Todolist.css'
import {connect} from "react-redux";
import Loader from "../../components/Loader/Loader";
import axios_ from "../../axios/axios";
import {setId, setLoading, setUsers, deleteId} from "../../redux/actions/auth";
import {useParams, useLocation, useRouteMatch, useHistory} from "react-router-dom";
import {setTasks, clearLocalTasks} from "../../redux/actions/tasks";


function Todolist({state, tasks, setTasks, setId, clearLocalTasks, deleteId}) {

  const params = useParams()
  const location = useLocation()
  const history = useHistory()

  const fetchId = () => {
    for (let key in state.users) {
      if (state.users[key].personId === Object.keys(params)[0]) setId(key)
    }
  }

  const clearDB = async () => {
    axios_.delete(`/todo/users/${localStorage.getItem('id')}/tasks.json`)
  }


  const sendData = async () => {

    console.log('+++SEND DATA+++')
    console.log('???', tasks, localStorage.getItem('id'))
    axios_.post(`/todo/users/${localStorage.getItem('id')}/tasks.json`, tasks)
      .then(res => {
        if (res.status === 200) {
          console.log(res)
          clearLocalTasks()
          deleteId()
          localStorage.removeItem('id')
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const fetchTasks = async () => {
    return await axios_.get(`/todo/users/${state.id}/tasks.json`)
      .then(r => {
        if ((Object.values(r.data))[0]) {
          setTasks((Object.values(r.data))[0])
          clearDB()
        }
      }).catch(e => console.log(e))
  }

  useEffect(() => {
    setLoading()
    fetchId()

    return () => {
      sendData()
    }
  }, [])


  useEffect(() => {
    setLoading()
    if (state.id) {
      fetchTasks()
    }
  }, [state.id])

  console.log(state, tasks)

  return (
    state.loading
      ? <Loader/>
      : <>
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