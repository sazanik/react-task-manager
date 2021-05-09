import React from 'react'
import ColumnTaskList from './ColumnTaskList'
import './TodoListPage.css'

function TodolistPage() {
  return (
    <>
      <ColumnTaskList box='green'/>
      <ColumnTaskList box='yellow'/>
      <ColumnTaskList box='red'/>
    </>
  )
}

export default TodolistPage