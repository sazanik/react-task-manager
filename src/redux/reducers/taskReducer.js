const initialState = [{green: [], yellow: [], red: []}, '']

const taskReducer = (state = initialState, action) => {
  const copyTasks = {...state[0]}
  let copyTextInput = state[1]

  const {name, box, check, type, id, e, input} = action
  console.log(action)

  switch (type) {
    case 'ADD_TASK':
      copyTasks[box].push({name: copyTextInput, check: check})
      return [copyTasks, copyTextInput]

    case 'TOGGLE_CHECK_TASK':
      copyTasks[box].forEach(el => {
        if (el.name === name) el.check = !el.check
      })
      return [copyTasks, copyTextInput]

    case 'DELETE_TASK':
      copyTasks[box].splice(id, 1)
      return [copyTasks, copyTextInput]

    case 'EDIT_TASK':
      return editTask(e, id, name, box, copyTasks, copyTextInput)


    case 'TOGGLE_VISIBLE_LIST':
      const list = e.target.nextSibling
      const title = e.target
      list.classList.toggle('hide')
      if (list.classList.contains('hide')) title.textContent = 'SHOW'
      else title.textContent = 'HIDE'
      return [copyTasks, copyTextInput]


    case 'ENTERED_TEXT':
      copyTextInput = e.target.value.trim()
      return [copyTasks, copyTextInput]

    case 'CLEAR_INPUT':
      copyTextInput = ''
      input.value = ''
      return [copyTasks, copyTextInput]


    default:
      return [copyTasks, copyTextInput]
  }
}
const editTask = (e, id, name, box, copyTasks, copyTextInput) => {
  let input
  let label
  const parent = e.target.parentNode

  if (e.target.previousSibling.tagName === 'INPUT') {
    input = e.target.previousSibling
    label = document.createElement('label')
    label.textContent = input.value
    if (!input.value) return
    parent.replaceChild(label, input)
    copyTasks[box][id].name = input.value
  } else {
    label = e.target.previousSibling
    input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.value = label.textContent.trim()
    parent.replaceChild(input, label)
    input.focus()
  }
  return [copyTasks, copyTextInput]
}


export default taskReducer
