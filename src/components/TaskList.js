import React, {useEffect, useState} from 'react'
import Task from './Task'
import {connect} from 'react-redux'
import {setLoading} from "../redux/actions/auth";
import Loader from "./Loader/Loader";
import {setTasks} from "../redux/actions/tasks";

function TaskList({tasks, box}) {

  const [localTasks, setLocalTasks] = useState(null)

  useEffect(() => {
    setLoading(false)
  }, [])



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

