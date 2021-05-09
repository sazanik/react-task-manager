const addTask = (name, box, check = false) => {
  return {
    type: 'ADD_TASK',
    name,
    box,
    check
  }
}

const toggleCheckTask = (name, box) => {
  return {
    type: 'TOGGLE_CHECK_TASK',
    name,
    box
  }
}

const deleteTask = (id, box) => {
  return {
    type: 'DELETE_TASK',
    id,
    box
  }
}

const editTask = (e, id, name, box) => {
  return {
    type: 'EDIT_TASK',
    e,
    id,
    name,
    box
  }
}

const toggleVisibleList = e => {
  return {
    type: 'TOGGLE_VISIBLE_LIST',
    e,
  }
}


export {addTask, toggleCheckTask, editTask, deleteTask, toggleVisibleList}