import React from 'react'
import {connect} from 'react-redux'
import {toggleCheckTask, editTask, deleteTask, enteredText} from '../redux/actions/actions'

function Task({name, box, check, id, toggleCheckTask, editTask, deleteTask, enteredText}) {

  const handleKeyDown = (e, id, name, box) => {
    if (e.code === 'Enter' && e.target.type === 'text') return editTask(e, id, name, box)
  }

  return (
    <li onKeyDown={e => handleKeyDown(e, id, name, box)}>
      <input type='checkbox'
             checked={check}
             onChange={() => toggleCheckTask(name, box)}/>
      <label onDoubleClick={!check ? e => editTask(e, id, name, box) : null}>{name}</label>
      <input onChange={e => enteredText(e)}
             className='input-edit disabled'
             type='text'/>
      <b onClick={check ? () => deleteTask(id, box) : e => editTask(e, id, name, box)}>
        {check ? 'X' : 'edit'}
      </b>
    </li>
  )
}

export default connect(
  null,
  {toggleCheckTask, editTask, deleteTask, enteredText}
)(Task)