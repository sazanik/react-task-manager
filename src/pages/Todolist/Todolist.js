import React, {useEffect} from 'react'
import ColumnTaskList from '../../components/ColumnTaskList'
import './Todolist.css'
import {connect} from "react-redux";
import Loader from "../../components/Loader/Loader";
import axios_ from "../../axios/axios";
import {setId, setUsers} from "../../redux/actions/auth";
import {useParams} from "react-router-dom";
import {setTasks} from "../../redux/actions/tasks";


function Todolist({state, tasks, setUsers, setId, setTasks}) {
  const params = useParams()

  const fetchData = async () => {
    const res = await axios_.get('/todo.json')
    setUsers(res.data.users)
  }

  const sendData = async () => {
    console.log('---SEND DATA---')
    const res = await axios_.post(`/todo/users/${state.id}/tasks.json`, tasks)
    console.log(res)
  }

  useEffect(() => {
    console.log('PARAMS')
    if (state?.currentUser?.tasks) {
      setTasks(Object.values(state.currentUser?.tasks)[0])
    }
    sendData()

  }, [params])


  useEffect(() => {
    for (let key in state.users) {
      if (state?.users[key].personId === Object.keys(params)[0]) return setId(key)
    }
    sendData()

  }, [state.id])


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
  {setUsers, setId, setTasks}
)(Todolist)