import React, {useEffect} from 'react'
import ColumnTaskList from '../../components/ColumnTaskList'
import './Todolist.css'
import {connect} from "react-redux";
import Loader from "../../components/Loader/Loader";
import axios_ from "../../axios/axios";
import {setUsers} from "../../redux/actions/auth";


function Todolist({state, setUsers}) {

  useEffect(async () => {
    await fetchData()
    async function fetchData() {
      const res = await axios_.get('/todo.json')
      setUsers(Object.values(res.data.users))
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
  state => ({state: state.auth}),
  {setUsers}
)(Todolist)