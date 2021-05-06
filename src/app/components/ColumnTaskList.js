import React, {useState, useRef} from 'react'
import './ColumnTaskList.css'

function TodolistPage() {
  const [store, setStore] = useState({green: ['g'], yellow: ['g'], red: ['r']})


  return (
    <>
      <ColumnTaskList subStore={store['green']} title='NORMAL' box='green'/>
      <ColumnTaskList subStore={store['yellow']} title='IMPORTANT' box='yellow'/>
      <ColumnTaskList subStore={store['red']} title='URGENT' box='red'/>
    </>
  )
}


function ColumnTaskList({subStore, title, box}) {
  const inputEl = useRef(null)
  const [tasks, setTasks] = useState(subStore)
  /*  const showMessage = () => {
      const cache = inputEl.current.value

      inputEl.current.value = ''
      inputEl.current.classList.add('duplicate')
      inputEl.current.placeholder = 'You entered a duplicate!'
      inputEl.current.disabled = true

      const clearID = setInterval(() => {
        inputEl.current.classList.toggle('duplicate')
      }, 500)

      setTimeout(() => {
        clearTimeout(clearID)
        inputEl.current.placeholder = "Enter text of the task..."
        inputEl.current.disabled = false
        inputEl.current.value = cache
        inputEl.current.focus()
      }, 2500)
    }*/
  console.log(tasks)

  const addItem = (e, box) => {
    e.preventDefault()
    for (let b in store) {
      console.log(store)
      let duplicate = store[b].some(el => (el.name === inputEl.current.value))
      if (duplicate) return /*showMessage()*/
    }
    if (!inputEl.current.value.trim()) return

    const copyStore = store
    copyStore[box].push(
      {
        name: inputEl.current.value,
        check: false
      }
    )

    setStore({...copyStore})
    inputEl.current.value = ''
  }

  const deleteItem = (id, box) => {
    const copyStore = store
    copyStore[box].splice(id, 1)
    setStore({...copyStore})
  }

  const editItem = (e, name, idx, box) => {
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
      input.value = label.textContent
      parent.replaceChild(input, label)
      input.focus()
    }
  }

  const toggleVisible = e => {
    console.log(store)
    e.target.nextElementSibling.classList.toggle('hide')
  }

  const isCheckedItem = (name, box) => {
    const copyStore = {...store}
    copyStore[box].forEach(el => {
      if (el.name === name) el.check = !el.check
    })
    setStore({...copyStore})
  }

  return (
    <div className={`column-task-list ${box}`}>
      <span
        onClick={toggleVisible}>{title}</span>
      <ol>
        <TaskList
          storeItems={store}
          boxItems={box}
          handleDelete={deleteItem}
          handleEdit={editItem}
          handleChange={isCheckedItem}

        />
      </ol>
      <form onSubmit={(e) => addItem(e, box)}>
        <input
          className='enter-text'
          type='text'
          ref={inputEl}
          placeholder="Enter text of the task..."
        />
        <button type="submit">add</button>
      </form>
    </div>
  )
}


function TaskList({storeItems, boxItems, handleDelete, handleEdit, handleChange}) {
  const deleteItem = (id, box) => handleDelete(id, box)
  const editItem = (e, name, id, box) => handleEdit(e, name, id, box)
  const isCheckedItem = (id, box) => handleChange(id, box)
  const items = storeItems[boxItems].map((el, idx) => (
      <Task
        key={el.name}
        check={el.check}
        name={el.name}
        handleDelete={() => deleteItem(idx, boxItems)}
        handleEdit={(e) => editItem(e, el.name, idx, boxItems)}
        handleChange={() => isCheckedItem(el.name, boxItems)}
      />
    )
  )

  return (
    <>
      {items}
      {/*{storeItems.map((el, idx) => (
          <Task
            key={idx}
            name={el.name}
            deleteHandler={() => deleteItem(idx)}
            changeHandler={() => isCheck(idx)}
          />
        )
      )}*/}
    </>
  )
}

function Task({name, check, handleDelete, handleEdit, handleChange}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={check}
        onChange={handleChange}
      />
      <label>{name}</label>
      <b
        onClick={check ? handleDelete : handleEdit}>
        {check ? 'X' : 'edit'}
      </b>
    </li>
  )
}

export default TodolistPage