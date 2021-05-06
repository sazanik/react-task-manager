import React, {useState, useRef} from 'react'
import './ColumnTaskList.css'

function TodolistPage() {
  const [store, setStore] = useState({
    green: [{name: 'green', check: false}],
    yellow: [{name: 'yellow', check: false}],
    red: [{name: 'red', check: false}]
  })
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
    for (let b in store) {
      let duplicate = store[b].some(el => (el.name === input.current.value))
      if (duplicate) return showMessage(input)
    }
    if (!input.current.value.trim()) return

    const copyStore = {...store}
    copyStore[box].push({name: input.current.value, check: false})
    setStore({...copyStore})
    input.current.value = ''
  }

  const deleteItem = (id, box) => {
    const copyStore = store
    copyStore[box].splice(id, 1)
    setStore({...copyStore})
  }

  const editItem = (e, idx, name, box) => {
    let input
    let label
    const parent = e.target.parentNode
    const copyStore = {...store}

    if (e.target.previousSibling.tagName === 'INPUT') {
      input = e.target.previousSibling
      label = document.createElement('label')
      label.textContent = input.value
      if (!input.value) return
      parent.replaceChild(label, input)
      copyStore[box][idx].name = input.value
      setStore({...copyStore})

    } else {
      label = e.target.previousSibling
      input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.value = label.textContent.trim()
      parent.replaceChild(input, label)
      input.focus()
    }
  }

  const toggleVisible = e => e.target.nextSibling.classList.toggle('hide')

  const toggleCheckItem = (name, box) => {
    const copyStore = {...store}
    copyStore[box].forEach(el => {
      if (el.name === name) el.check = !el.check
    })
    setStore({...copyStore})
  }

  return (
    <>
      <ColumnTaskList
        store={store}
        input={inputG}
        toggleVisible={toggleVisible}
        deleteItem={deleteItem}
        editItem={editItem}
        toggleCheckItem={toggleCheckItem}
        addItem={addItem}
        title='NORMAL'
        box='green'
      />
      <ColumnTaskList
        store={store}
        input={inputY}
        toggleVisible={toggleVisible}
        deleteItem={deleteItem}
        editItem={editItem}
        toggleCheckItem={toggleCheckItem}
        addItem={addItem}
        title='IMPORTANT'
        box='yellow'
      />
      <ColumnTaskList
        store={store}
        input={inputR}
        toggleVisible={toggleVisible}
        deleteItem={deleteItem}
        editItem={editItem}
        toggleCheckItem={toggleCheckItem}
        addItem={addItem}
        title='URGENT'
        box='red'
      />
    </>
  )
}

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

function Task({name, check, handleDelete, handleEdit, handleChange}) {
  return (
    <li>
      <input type="checkbox"
             checked={check}
             onChange={handleChange}/>
      <label>{name}</label>
      <b
         onClick={check ? handleDelete : handleEdit}
      >
        {check ? 'X' : 'edit'}
      </b>
    </li>
  )
}

export default TodolistPage
