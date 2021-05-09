import React from 'react'
import Task from './Task'
import {connect} from 'react-redux'

function TaskList({bank, box}) {

  const items = bank[box].map((el, idx) => (
      <Task
        key={el.name}
        check={el.check}
        name={el.name}
        box={box}
        id={idx}
      />
    )
  )

  return (
    <>{items}</>
  )
}

export default connect(
  (state) => ({bank: state}),
  null
)
(TaskList)