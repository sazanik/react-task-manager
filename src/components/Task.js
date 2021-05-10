import React from 'react'
import {connect} from 'react-redux'
import {toggleCheckTask, editTask, deleteTask} from '../redux/actions/actions'

function Task({name, box, check, id, toggleCheckTask, editTask, deleteTask}) {

  return (
    <li>
      <input type="checkbox"
             checked={check}
             onChange={() => toggleCheckTask(name, box)}/>
      <label>{name}</label>
      <b
        onClick={check ?
          () => deleteTask(id, box) :
          (e) => editTask(e, id, name, box)}
      >
        {check ? 'X' : 'edit'}
      </b>
    </li>
  )
}

export default connect(
  null,
  {toggleCheckTask, editTask, deleteTask}
)(Task)