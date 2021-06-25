import React from 'react'
import TaskList from './TaskList'
import {connect} from 'react-redux'
import {addTask, toggleVisibleList, enteredText, clearInput} from '../redux/actions/tasks'
import axios_ from "../axios/axios";


function ColumnTaskList({state, tasks, box, addTask, toggleVisibleList, enteredText, clearInput}) {

  console.log(state, tasks)

  const getData = async () => {
    const res = await axios_.get('/todo/users/-Mco7EfeJueBgvDL1YR9.json')
    console.log(res.data)
  }

  const sendData = async () => {
    const res = await axios_.post('/todo/users/-Mco7EfeJueBgvDL1YR9/tasks.json', tasks)
    console.log(res)
  }

  const delData = async () => {
    const res = await axios_.delete('/todo/users/-Mco7EfeJueBgvDL1YR9/tasks.json')
    console.log(res)
  }

  const handleSubmit = (e, box) => {
    e.preventDefault()
    // getData()
    // sendData()
    delData()


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