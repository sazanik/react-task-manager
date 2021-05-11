import React from 'react'
import ColumnTaskList from '../../components/ColumnTaskList'
import './Todolist.css'

function Todolist() {
  return (
    <>
      <ColumnTaskList box='green'/>
      <ColumnTaskList box='yellow'/>
      <ColumnTaskList box='red'/>
    </>
  )
}

export default Todolist