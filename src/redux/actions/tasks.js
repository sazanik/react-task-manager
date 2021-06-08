const addTask = (input, box, check = false) => {
  return {
    type: 'ADD_TASK',
    input,
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

const enteredText = e => {
  return {
    type: 'ENTERED_TEXT',
    e
  }
}

const clearInput = input => {
  return {
    type: 'CLEAR_INPUT',
    input
  }
}

const showMessage = (input, placeholder) => {
  return {
    type: 'SHOW_MESSAGE',
    input,
    placeholder
  }
}


export {addTask, toggleCheckTask, editTask, deleteTask, toggleVisibleList, enteredText, clearInput, showMessage}