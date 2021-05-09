import React, {useRef} from 'react'
import ColumnTaskList from './ColumnTaskList'
import './TodoListPage.css'
import {connect} from "react-redux";
import {addTask, toggleCheckTask} from "../redux/actions/taskAction"

function TodolistPage({addTask, toggleCheckTask, bank}) {

  const inputG = useRef(null)
  const inputY = useRef(null)
  const inputR = useRef(null)



  const showMessage = input => {
    const cache = input.current.value

    input.current.value = ''
    input.current.classList.add('duplicate')
    input.current.placeholder = 'You entered a duplicate!'
    input.current.disabled = true

    setTimeout(() => {
      input.current.classList.remove('duplicate')
      input.current.placeholder = "Enter text of the task..."
      input.current.disabled = false
      input.current.value = cache
      input.current.focus()
    }, 700)
  }

  const addItem = (e, box, input) => {
    e.preventDefault()
    for (let b in bank) {
      let duplicate = bank[b].some(el => (el.name === input.current.value))
      if (duplicate) return showMessage(input)
    }
    if (!input.current.value.trim()) return

    addTask(input.current.value.trim(), box)

    input.current.value = ''
  }




  const toggleVisible = e => e.target.nextSibling.classList.toggle('hide')


  return (
    <>
      <ColumnTaskList
        store={bank}
        input={inputG}
        toggleVisible={toggleVisible}
        addItem={addItem}
        title='NORMAL'
        box='green'
      />
      <ColumnTaskList
        store={bank}
        input={inputY}
        toggleVisible={toggleVisible}
        addItem={addItem}
        title='IMPORTANT'
        box='yellow'
      />
      <ColumnTaskList
        store={bank}
        input={inputR}
        toggleVisible={toggleVisible}
        addItem={addItem}
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