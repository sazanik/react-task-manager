import React from 'react'
import Task from './Task'
import {connect} from 'react-redux'

function TaskList({bank, box}) {
  const tasks = bank[0]
  const items = tasks[box].map((el, id) => (
    <Task
      key={el.name + id}
      name={el.name}
      box={box}
      check={el.check}
      id={id}
    />))

  return (
    <>{items}</>
  )
}

export default connect(
  (state) => ({bank: state}),
  null
)
(TaskList)