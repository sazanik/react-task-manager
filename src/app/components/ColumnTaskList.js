import React, {Component} from 'react'
import './ColumnTaskList.css'

class ColumnTaskList extends Component {
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
}

function TaskList(props) {

  const deleteItem = (id) => {
    props.delete(id)
  }

  const isCheck = (id) => {
    props.changeHandler(id)
  }

  const TaskItems = props.items.map((el, idx) => (
      <Task
        key={idx}
        changeHandler={() => isCheck(idx)}
        delete={() => deleteItem(idx)}
        name={el}
      />
    )
  )

  return (
    <>
      {TaskItems}
      {/* {props.items.map((el, idx) => (
          <Task
            key={idx}
            changeHandler={isCheck}
            delete={() => deleteItem(idx)}
            name={el}
          />
        )
      )}*/}
    </>
  )
}

const Task = props => {
  return (
    <li>
      <input onChange={props.changeHandler}
             type="checkbox"/>
      <label>{props.name}</label>
      <b onClick={props.delete}>X</b>
    </li>
  )
}


export default ColumnTaskList