import {useState, useRef} from 'react'
import './ColumnTaskList.css'

/*class ColumnTaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {items: []}
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  addItem(e) {
    e.preventDefault()
    if (!this._input.value.trim()) return

    const taskList = this.state.items
    taskList.push(this._input.value)
    this.setState({items: taskList})
    this._input.value = ''
  }

  deleteItem(key) {
    const newItems = this.state.items.filter((item, idx) => idx !== key)
    this.setState({items: newItems})
  }

  changeHandler(id) {
    console.log(id)
  }

  render() {
    return (
      <div className={`column-task-list ${this.props.box}`}>
        <span>{this.props.title}</span>
        <ol>
          <TaskList
            changeHandler={this.changeHandler}
            delete={this.deleteItem}
            items={this.state.items}/>
        </ol>
        <form onSubmit={this.addItem}>
          <input type='text'
                 ref={el => this._input = el}
                 placeholder="Enter text of the task..."/>
          <button type="submit">add</button>
        </form>
      </div>
    )
  }
}*/
function ColumnTaskList({title, box}) {
  const [store, setStore] = useState({
    green: [],
    yellow: [/*{name: 'taskYellow', check: false}, {name: 'taskYellow', check: false}*/],
    red: [/*{name: 'taskRed', check: false}, {name: 'taskRed', check: false}*/]
  })

  // const [cache, setCache] = useState('')
  const inputEl = useRef(null)

  const showMessage = () => {
    const cache = inputEl.current.value

    inputEl.current.value = ''
    inputEl.current.classList.toggle('duplicate')
    inputEl.current.placeholder = 'You entered a duplicate!'

    const clearID = setInterval(() => {
      inputEl.current.disabled = true
      inputEl.current.classList.toggle('duplicate')
    }, 500)

    setTimeout(() => {
      clearTimeout(clearID)
      inputEl.current.placeholder = "Enter text of the task..."
      inputEl.current.disabled = false
      inputEl.current.value = cache
      inputEl.current.focus()
    }, 2500)

    return cache
  }


  const addItem = (e, box) => {
    e.preventDefault()
    console.log(store)

    for (let b in store) {
      let duplicate = store[b].some(el => (el.name === inputEl.current.value))
      if (duplicate) return showMessage()
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
    const filteredItems = store[box].filter((el, i) => i !== id)
    let copyStore = store
    for (let b in copyStore) {
      if (b === box) copyStore[b] = filteredItems
    }
    setStore({...copyStore})
  }


  const isCheckedItem = (id, box) => console.log(id, box)

  return (
    <div className={`column-task-list ${box}`}>
      <span>{title}</span>
      <ol>
        <TaskList
          storeItems={store}
          boxItems={box}
          handleDelete={deleteItem}
          handleChange={isCheckedItem}
        />
      </ol>
      <form onSubmit={(e) => addItem(e, box)}>
        <input
          type='text'
          ref={inputEl}
          placeholder="Enter text of the task..."
        />
        <button type="submit">add</button>
      </form>
    </div>
  )
}


function TaskList({storeItems, boxItems, handleDelete, handleChange}) {
  const deleteItem = (id, box) => handleDelete(id, box)
  const isCheckedItem = (id, box) => handleChange(id, box)

  const items = storeItems[boxItems].map((el, idx) => (
      <Task
        key={idx}
        name={el.name}
        handleDelete={() => deleteItem(idx, boxItems)}
        handleChange={() => isCheckedItem(idx, boxItems)}
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

function Task({name, handleDelete, handleChange}) {
  return (
    <li>
      <input
        onChange={handleChange}
        type="checkbox"
      />
      <label>{name}</label>
      <b onClick={handleDelete}>X</b>
    </li>
  )
}

export default ColumnTaskList