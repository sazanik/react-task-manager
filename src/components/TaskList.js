import React, {useEffect, useState} from 'react'
import Task from './Task'
import {connect} from 'react-redux'

function TaskList({auth, box}) {

  const [tasks, setTasks] = useState({
    green: [],
    yellow: [],
    red: []
  })


  useEffect(() => {
    if (auth.currentUser && auth.currentUser.tasks) {
      setTasks(auth.currentUser.tasks)
    }
  })

  return (
    tasks || auth.currentUser.tasks
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
  state => ({tasks: state.tasks, auth: state.auth}),
  null
)
(TaskList)

