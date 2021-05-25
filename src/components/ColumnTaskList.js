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
    <div className={`column ${box}`}>
      <span className='column__title'
            onClick={(e) => toggleVisibleList(e)}>HIDE</span>
      <ol className='column__list'>
          <TaskList box={box}/>
      </ol>
      <form
        className='form-add-task'
        onSubmit={e => handleSubmit(e, box)}>
        <input
          className='form-add-task__input'
          onChange={e => enteredText(e)}
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