import React from 'react'
import Task from './Task'
import {connect} from 'react-redux'

function TaskList({bank, box}) {
  const tasks = bank[0]
  const items = tasks[box].map((el, idx) => (
    <Task
      key={el.name}
      name={el.name}
      box={box}
      check={el.check}
      id={idx}
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