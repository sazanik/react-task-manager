function addTask(name, box, check = false) {
  return {
    type: 'ADD_TASK',
    name: name,
    box: box,
    check: check
  }
}

export {addTask}