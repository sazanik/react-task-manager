import React, {useEffect} from 'react'
import Task from './Task'
import {connect} from 'react-redux'
import {setLoading} from "../redux/actions/auth";

function TaskList({tasks, box}) {

  useEffect(()=> {
    console.log('TL: tasks', tasks)
    setLoading(false)
  })

  return (
    tasks[box].map((el, id) => (
      <Task
        key={id + el.name}
        name={el.name}
        box={box}
        check={el.check}
        id={id}
      />
    ))
  )

}

export default connect(
  state => ({state: state.auth, tasks: state.tasks}),
  null
)
(TaskList)

