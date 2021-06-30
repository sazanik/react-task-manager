import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {toggleCheckTask, editTask, deleteTask, enteredText} from '../redux/actions/tasks'

function Task({tasks, state, name, box, check, id, toggleCheckTask, editTask, deleteTask, enteredText}) {

  const handleKeyDown = (e, id, name, box) => {
    if (e.code === 'Enter' && e.target.type === 'text') {
      return editTask(e, id, name, box)
    }
  }

  return (
    <li onKeyDown={e => handleKeyDown(e, id, name, box)}>
      <input type='checkbox'
             checked={check}
             onChange={() => toggleCheckTask(name, box)}/>
      <label onDoubleClick={!check ? e => editTask(e, id, name, box) : null}>{name}</label>

      <input onChange={e => enteredText(e)}
             className='input-edit disabled'
             type='text'
      />
      {state.currentPerson.role === 'user'
        ? null
        : <b onClick={check ? () => deleteTask(id, box) : e => editTask(e, id, name, box)}>
          {check ? 'X' : 'edit'}
        </b>
      }

    </li>
  )
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  box: PropTypes.string,
  check: PropTypes.bool,
  id: PropTypes.number,
  toggleCheckTask: PropTypes.func,
  editTask: PropTypes.func,
  deleteTask: PropTypes.func,
  enteredText: PropTypes.func,
}

export default connect(
  state => ({state: state.auth, tasks: state.tasks}),
  {toggleCheckTask, editTask, deleteTask, enteredText}
)(Task)