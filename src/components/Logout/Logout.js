import React, {useEffect} from "react";
import {connect} from "react-redux";
import {authLogout, setIsLogin} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";

const Logout = ({authLogout, setIsLogin}) => {

  useEffect(() => {
    setIsLogin(true)
    localStorage.clear()
    authLogout()
  }, [authLogout, setIsLogin])

  return (
    <Redirect to='/'/>
  )

}

export default connect(
  null,
  {authLogout, setIsLogin}
)(Logout)