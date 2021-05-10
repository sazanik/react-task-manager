import React from 'react'
import {Link} from 'react-router-dom'

function Registration() {
  return (
    <div>
      <Link to='/'>Back</Link>
      <br/>
      <Link to='/todolist'>Todolist</Link>
      <h1>Registration page</h1>
    </div>
  )
}

export default Registration