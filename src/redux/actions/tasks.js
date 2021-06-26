export const addTask = (input, box, check = false) => {
  return {
    type: 'ADD_TASK',
    input,
    box,
    check
  }
}

export const toggleCheckTask = (name, box) => {
  return {
    type: 'TOGGLE_CHECK_TASK',
    name,
    box
  }
}

export const deleteTask = (id, box) => {
  return {
    type: 'DELETE_TASK',
    id,
    box
  }
}

export const editTask = (e, id, name, box) => {
  return {
    type: 'EDIT_TASK',
    e,
    id,
    name,
    box
  }
}

export const toggleVisibleList = e => {
  return {
    type: 'TOGGLE_VISIBLE_LIST',
    e,
  }
}

export const enteredText = e => {
  return {
    type: 'ENTERED_TEXT',
    e
  }
}

export const clearInput = input => {
  return {
    type: 'CLEAR_INPUT',
    input
  }
}

export const showMessage = (input, placeholder) => {
  return {
    type: 'SHOW_MESSAGE',
    input,
    placeholder
  }
}

export const setTasks = tasks => {
  return {
    type: 'SET_TASKS',
    tasks
  }
}

export const clearLocalTasks = () => {
  return {
    type: 'CLEAR_LOCAL_TASKS'
  }
}
