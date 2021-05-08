import React from 'react'
import TaskList from './TaskList'

function ColumnTaskList({store, title, box, input, toggleVisible, deleteItem, editItem, toggleCheckItem, addItem}) {
  return (
    <div className={`column-task-list ${box}`}>
      <span
        onClick={toggleVisible}>{title}</span>
      <ol>
        <TaskList
          store={store}
          box={box}
          deleteItem={deleteItem}
          editItem={editItem}
          toggleCheckItem={toggleCheckItem}
        />
      </ol>
      <form onSubmit={(e) => addItem(e, box, input)}>
        <input
          className='enter-text'
          type='text'
          ref={input}
          placeholder="Enter text of the task..."
        />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default ColumnTaskList