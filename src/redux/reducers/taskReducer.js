const initialState =
  {
    green: [{name: 'name-task', check: false}],
    yellow: [{name: 'name-task', check: false}],
    red: [{name: 'name-task', check: false}]
  }

const taskReducer = (state = initialState, action) => {
  const copyStore = {...state}
  const {name, box, check, type, id, e} = action

  switch (type) {
    case 'ADD_TASK':
      console.log('add reducer')
      copyStore[box].push({name: name, check: check})
      return copyStore

    case 'TOGGLE_CHECK_TASK':
      console.log('toggle reducer')
      copyStore[box].forEach(el => {
        if (el.name === name) el.check = !el.check
      })
      return copyStore

    case 'DELETE_TASK':
      console.log('delete reducer')
      copyStore[box].splice(id, 1)
      return copyStore

    case 'EDIT_TASK':
      console.log('edit reducer')
      return editTask(e, id, name, box, copyStore)

    default:
      return state
  }
}
const editTask = (e, id, name, box, copyStore) => {
  let input
  let label
  const parent = e.target.parentNode

  if (e.target.previousSibling.tagName === 'INPUT') {
    input = e.target.previousSibling
    label = document.createElement('label')
    label.textContent = input.value
    if (!input.value) return
    parent.replaceChild(label, input)
    copyStore[box][id].name = input.value
  } else {
    label = e.target.previousSibling
    input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.value = label.textContent.trim()
    parent.replaceChild(input, label)
    input.focus()
  }
  return copyStore
}

export default taskReducer
