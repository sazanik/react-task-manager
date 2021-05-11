import React from 'react'
import TaskList from './TaskList'
import {connect} from 'react-redux'
import {addTask, toggleVisibleList, enteredText, clearInput} from '../redux/actions/actions'

function ColumnTaskList({box, addTask, toggleVisibleList, enteredText, clearInput}) {

  const handleSubmit = (e, box) => {
    e.preventDefault()
    const input = e.target.firstChild
    toggleVisibleList(e)
    addTask(input, box)
    clearInput(input)
  }

  return (
    <div className={`column-task-list ${box}`}>
      <span
        onClick={(e) => toggleVisibleList(e)}>HIDE</span>
      <ol>
        <TaskList box={box}/>
      </ol>
      <form onSubmit={e => handleSubmit(e, box)}>
        <input
          onChange={e => enteredText(e)}
          className='enter-text'
          type='text'
          placeholder="Enter text of the task..."
        />
      </form>
    </div>
  )
}

export default connect(
  (state) => ({bank: state}),
  {addTask, toggleVisibleList, enteredText, clearInput}
)(ColumnTaskList)