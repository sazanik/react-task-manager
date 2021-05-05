import React from "react"
import ColumnTaskList from "./components/ColumnTaskList"
import './App.css'

function App() {
  return (
    <>
      <ColumnTaskList title='NORMAL' box='green'/>
      <ColumnTaskList title='IMPORTANT' box='yellow'/>
      <ColumnTaskList title='URGENT' box='red'/>
    </>
  )
}

export default App
