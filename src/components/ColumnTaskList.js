import React from 'react'
import TaskList from './TaskList'
import {connect} from 'react-redux'
import {addTask, toggleVisibleList} from '../redux/actions/taskAction'

function ColumnTaskList({bank, title, box, input, toggleVisibleList, addTask}) {

  const handleSubmit = (e, box, input) => {
    e.preventDefault()
    for (let b in bank) {
      const duplicate = bank[b].some(el => (el.name === input.current.value))
      if (duplicate) return showMessage(input)
    }
    if (!input.current.value.trim()) return

    addTask(input.current.value.trim(), box)

    input.current.value = ''
  }

  const showMessage = input => {
    const cache = input.current.value

    input.current.value = ''
    input.current.classList.add('duplicate')
    input.current.placeholder = 'You entered a duplicate!'
    input.current.disabled = true

    setTimeout(() => {
      input.current.classList.remove('duplicate')
      input.current.placeholder = "Enter text of the task..."
      input.current.disabled = false
      input.current.value = cache
      input.current.focus()
    }, 700)
  }


  return (
    <div className={`column-task-list ${box}`}>
      <span
        onClick={(e) => toggleVisibleList(e)}>{title}</span>
      <ol>
        <TaskList
          store={bank}
          box={box}
        />
      </ol>
      <form onSubmit={(e) => handleSubmit(e, box, input)}>
        <input
          className='enter-text'
          type='text'
          ref={input}
          placeholder="Enter text of the task..."
        />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default connect(
  (state) => ({bank: state}),
  {addTask, toggleVisibleList}
)(ColumnTaskList)