import React from 'react'
import Task from './Task'
import {connect} from 'react-redux'

function TaskList({tasks, box}) {

  return (
    tasks
      ? tasks[box].map((el, id) => (
        <Task
          key={id + el.name}
          name={el.name}
          box={box}
          check={el.check}
          id={id}
        />
      ))
      : null
  )

}

export default connect(
  state => ({state: state.auth, tasks: state.tasks}),
  null
)
(TaskList)

