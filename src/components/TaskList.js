import React from 'react'
import Task from './Task'

function TaskList({store, box, deleteItem, editItem, toggleCheckItem}) {

  const items = store[box].map((el, idx) => (
      <Task
        key={el.name}
        check={el.check}
        name={el.name}
        box={box}
        handleDelete={() => deleteItem(idx, box)}
        handleEdit={(e) => editItem(e, idx, el.name, box)}
        handleChange={() => toggleCheckItem(el.name, box)}
      />
    )
  )

  return (
    <>{items}</>
  )
}

export default TaskList