import React, {useEffect} from "react";
import {connect} from "react-redux";
import {logout, setIsLogin} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";

const Logout = ({logout, setIsLogin}) => {

  useEffect(() => {
    setIsLogin(true)
    logout()
  }, [logout, setIsLogin])

  return (
    <Redirect to='/'/>
  )

}

export default connect(
  null,
  {logout, setIsLogin}
)(Logout)