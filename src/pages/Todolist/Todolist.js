import React, {useEffect} from 'react'
import ColumnTaskList from '../../components/ColumnTaskList'
import './Todolist.css'
import {connect} from "react-redux";
import Loader from "../../components/Loader/Loader";
import axios_ from "../../axios/axios";
import {setId, setLoading, setUsers} from "../../redux/actions/auth";
import {useParams} from "react-router-dom";
import {setTasks} from "../../redux/actions/tasks";


function Todolist({state, tasks, setUsers, setId, setTasks, setLoading}) {
  const INITIAL_STATE = {
    green: [{name: 'test', check: false}],
    yellow: [{name: 'test', check: false}],
    red: [{name: 'test', check: false}]
  }
  const params = useParams()

  const fetchId = async () => {
    for (let key in state.users) {
      if (state?.users[key].personId === Object.keys(params)[0]) return setId(key)
    }
  }


  const sendData = async () => {
    console.log('---SEND DATA---')
    await axios_.delete(`/todo/users/${state.id}/tasks.json`)
    await axios_.post(`/todo/users/${state.id}/tasks.json`, tasks)
  }

  const fetchTasks = async () => {
    const res = await axios_.get(`/todo/users/${state.id}/tasks.json`)
    console.log(res.data)
  }


  useEffect(() => {
    console.log('+++FETCH ID+++')
    fetchId()
    // fetchTasks()

    return () => {
      console.log('---FETCH ID---')
      sendData()
    }
  }, [])


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
  {setUsers, setId, setTasks, setLoading}
)(Todolist)