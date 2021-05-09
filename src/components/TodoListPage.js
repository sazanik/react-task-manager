import React, {useRef} from 'react'
import ColumnTaskList from './ColumnTaskList'
import './TodoListPage.css'
import {connect} from "react-redux";
import {addTask, toggleCheckTask} from "../redux/actions/taskAction"

function TodolistPage({bank}) {

  const inputG = useRef(null)
  const inputY = useRef(null)
  const inputR = useRef(null)


  return (
    <>
      <ColumnTaskList
        store={bank}
        input={inputG}
        title='NORMAL'
        box='green'
      />
      <ColumnTaskList
        store={bank}
        input={inputY}
        title='IMPORTANT'
        box='yellow'
      />
      <ColumnTaskList
        store={bank}
        input={inputR}
        title='URGENT'
        box='red'
      />
    </>
  )
}

export default connect(
  (state)=> ({bank: state}),
  {addTask, toggleCheckTask}
)(TodolistPage)