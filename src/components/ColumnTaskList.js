import React from 'react'
import TaskList from './TaskList'
import {connect} from 'react-redux'
import {addTask, toggleVisibleList, enteredText, clearInput} from '../redux/actions/taskAction'

function ColumnTaskList({bank, box, addTask, toggleVisibleList,  enteredText, clearInput}) {
  const tasks = bank[0]

  const handleSubmit = (e, box) => {
    let input = e.target.firstChild
    e.preventDefault()
    if (!input.value.trim()) return

    for (let b in tasks) {
      if (tasks[b].some(el => (el.name === input.value))) {
        return showMessage(input)
      }
    }

    addTask(box)
    clearInput(input)
  }
  const showMessage = (input) => {
    const cache = input.value

    input.value = ''
    input.classList.add('duplicate')
    input.placeholder = 'You entered a duplicate!'
    input.disabled = true

    setTimeout(() => {
      input.classList.remove('duplicate')
      input.placeholder = "Enter text of the task..."
      input.disabled = false
      input.value = cache
      input.focus()
    }, 700)

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
      <form onSubmit={(e) => handleSubmit(e, box)}>
        <input
          onChange={(e) => enteredText(e)}
          className='enter-text'
          type='text'
          placeholder="Enter text of the task..."
        />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default connect(
  (state) => ({bank: state}),
  {addTask, toggleVisibleList, enteredText, clearInput}
)(ColumnTaskList)