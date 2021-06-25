import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Task from './Task'
import {connect} from 'react-redux'


function TaskList({state, box}) {
  const params = useParams()

  const [tasks, setTasks] = useState({
    green: [{name: 'test', check: false}],
    yellow: [],
    red: []
  })

  useEffect(() => {
    if (state?.currentUser?.tasks) setTasks(state.currentUser.tasks)

  }, [])

  return (
    tasks || state?.currentUser?.tasks
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
  state => ({state: state.auth}),
  null
)
(TaskList)

