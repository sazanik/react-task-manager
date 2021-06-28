import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logout, setIsLogin} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";
import {clearLocalTasks} from "../../redux/actions/tasks";

const Logout = ({logout, setIsLogin, clearLocalTasks}) => {

  useEffect(() => {
    setIsLogin(true)
    logout()
    clearLocalTasks()
  }, [])

  return (
    <Redirect to='/'/>
  )

}

export default connect(
  state => ({state: state.auth, tasks: state.tasks}),
  {logout, setIsLogin, clearLocalTasks}
)(Logout)