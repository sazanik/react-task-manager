import React, {useEffect} from 'react'
import TaskList from './TaskList'
import {connect} from 'react-redux'
import {addTask, toggleVisibleList, enteredText, clearInput} from '../redux/actions/tasks'
import Loader from "./Loader/Loader";
import {setLoading} from "../redux/actions/auth";

function ColumnTaskList({state, tasks, box, addTask, toggleVisibleList, enteredText, clearInput}) {

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
  state => ({state: state.auth, tasks: state.tasks}),
  {addTask, toggleVisibleList, enteredText, clearInput}
)(ColumnTaskList)