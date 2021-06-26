import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logout, setIsLogin} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";
import axios_ from "../../axios/axios";

const Logout = ({state, tasks, logout, setIsLogin}) => {

  const sendData = async () => {
    await axios_.delete(`/todo/users/${state.id}/tasks.json`)
    await axios_.post(`/todo/users/${state.id}/tasks.json`, tasks)

  }

  useEffect(() => {
    sendData()
    setIsLogin(true)
    logout()
  }, [])

  return (
    <Redirect to='/'/>
  )

}

export default connect(
  state => ({state: state.auth, tasks: state.tasks}),
  {logout, setIsLogin}
)(Logout)