import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {authLogout} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";

const Logout = ({authLogout}) => {
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    if (firstRender) return setFirstRender(false)
    if (!firstRender) authLogout()
  })

  return (
    <Redirect to='/'/>
  )

}

export default connect(
  null,
  {authLogout}
)(Logout)