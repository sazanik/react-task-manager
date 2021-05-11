import React from 'react'
import TaskList from './TaskList'
import {connect} from 'react-redux'
import {addTask, toggleVisibleList, enteredText, clearInput} from '../redux/actions/actions'

function ColumnTaskList({bank, box, addTask, toggleVisibleList, enteredText, clearInput}) {
  // const tasks = bank[0]


  const handleSubmit = (e, box) => {

    let input = e.target.firstChild
    e.preventDefault()
   /* if (!input.value.trim().length) return showMessage(input)

    for (let b in tasks) {
      if (tasks[b].some(el => (el.name === input.value.trim()))) {
        return showMessage(input, 'This task already exists!')
      }
    }*/

    toggleVisibleList(e)
    addTask(input, box)
    clearInput(input)
  }

  return (
    <div className={`column-task-list ${box}`}>
      <span
        onClick={(e) => toggleVisibleList(e)}>HIDE</span>
      <ol>
        <TaskList
          box={box}
        />
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