import React from 'react'
import {connect} from 'react-redux'
import {toggleCheckTask, editTask, deleteTask} from '../redux/actions/actions'

function Task({name, box, check, id, toggleCheckTask, editTask, deleteTask}) {

  const handleKeyDown = (e, id, name, box) => {
    if (e.code) return editTask(e, id, name, box)
  }
  console.log(check)

  return (
    <li onKeyDown={e => handleKeyDown(e, id, name, box)}>
      <input type='checkbox'
             checked={check}
             onChange={() => toggleCheckTask(name, box)}/>
      <label onDoubleClick = {e => editTask(e, id, name, box)}>{name}</label>
      <input className='edit hide'
             type='text'/>
      <b onClick={check ? () => deleteTask(id, box) : e => editTask(e, id, name, box)}>
        {check ? 'X' : 'edit'}
      </b>
    </li>
  )
}

export default connect(
  null,
  {toggleCheckTask, editTask, deleteTask}
)(Task)