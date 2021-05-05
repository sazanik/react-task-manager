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
    green: [/*{name: 'taskGreen', check: false}, {name: 'taskGreen', check: false}*/],
    yellow: [/*{name: 'taskYellow', check: false}, {name: 'taskYellow', check: false}*/],
    red: [/*{name: 'taskRed', check: false}, {name: 'taskRed', check: false}*/]
  })
  const inputEl = useRef(null)

  const addItem = (e, box) => {
    e.preventDefault()
    if (!inputEl.current.value.trim()) return

    const copyStore = store
    console.log({...copyStore})
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


  const handleInputChange = (id, box) => console.log(id, box)

  return (
    <div className={`column-task-list ${box}`}>
      <span>{title}</span>
      <ol>
        <TaskList
          storeItems={store}
          boxItems={box}
          deleteHandler={deleteItem}
          changeHandler={handleInputChange}
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


function TaskList({storeItems, boxItems, deleteHandler, changeHandler}) {
  console.log(storeItems[boxItems])
  const deleteItem = (id, box) => deleteHandler(id, box)
  const isCheck = (id, box) => changeHandler(id, box)

  const items = storeItems[boxItems].map((el, idx) => (
      <Task
        key={idx}
        name={el.name}
        deleteHandler={() => deleteItem(idx, boxItems)}
        changeHandler={() => isCheck(idx, boxItems)}
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

function Task({name, deleteHandler, changeHandler}) {
  return (
    <li>
      <input
        onChange={changeHandler}
        type="checkbox"
      />
      <label>{name}</label>
      <b onClick={deleteHandler}>X</b>
    </li>
  )
}

export default ColumnTaskList