const addTask = (name, box, check = false) => {
  console.log('addTask')
  return {
    type: 'ADD_TASK',
    name,
    box,
    check
  }
}


export {addTask}