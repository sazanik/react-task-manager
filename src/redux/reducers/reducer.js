const initialState = [{green: [], yellow: [], red: []}, '']

const reducer = (state = initialState, action) => {
  const copyTasks = {...state[0]}
  let copyTextInput = state[1]

  const {name, box, check, type, id, e, input, placeholder} = action
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
      let list = e.target.nextSibling
      let title = e.target
      if (e.type === "submit") {
        list = e.target.previousSibling
        title = list.previousSibling
        title.textContent = 'HIDE'
        list.classList.remove('hide')
        return [copyTasks, copyTextInput]
      } else {
        list.classList.toggle('hide')
        if (list.classList.contains('hide')) title.textContent = 'SHOW'
        else title.textContent = 'HIDE'
        return [copyTasks, copyTextInput]
      }

    case 'ENTERED_TEXT':
      copyTextInput = e.target.value.trim()
      return [copyTasks, copyTextInput]

    case 'CLEAR_INPUT':
      copyTextInput = ''
      input.value = ''
      return [copyTasks, copyTextInput]

    case 'SHOW_MESSAGE':
      return showMessage(input, copyTasks, copyTextInput, placeholder)


    default:
      return [copyTasks, copyTextInput]
  }
}


const editTask = (e, id, name, box, copyTasks, copyTextInput) => {
  console.log(e)

  if (e.target.type === 'checkbox') return

  const parent = e.target.parentNode
  let input
  let label

  if (e.type === 'dblclick' && e.target.tagName === 'LABEL') {
    label = e.target
    // label.setAttribute('onDoubleClick', '{e => editTask(e, id, name, box)}')
    input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('class', 'edit')
    input.value = label.textContent.trim()
    parent.replaceChild(input, label)
    input.focus()
  } else if (e.target.previousSibling.classList.contains('edit') && e.target.previousSibling.tagName === 'INPUT') {

    const input = e.target.previousSibling
    if (!input.value.trim().length) return showMessage(input, copyTasks, copyTextInput)

    for (let b in copyTasks) {
      if (copyTasks[b].some(el => (el.name === input.value && name !== input.value))) {
        return showMessage(input, copyTasks, copyTextInput, 'This task already exists!')
      }
    }

    label = document.createElement('label')
    label.textContent = input.value
    parent.replaceChild(label, input)
    copyTasks[box][id].name = input.value


  } else if (e.target.previousSibling.tagName === 'LABEL') {
    label = e.target.previousSibling
    input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('class', 'edit')
    input.value = label.textContent.trim()
    parent.replaceChild(input, label)
    input.focus()

  } else if (e.code === 'Enter') {
    input = e.target
    if (!input.value.trim().length) return showMessage(input, copyTasks, copyTextInput)
    for (let b in copyTasks) {
      if (copyTasks[b].some(el => (el.name === input.value && name !== input.value))) {
        return showMessage(input, copyTasks, copyTextInput, 'This task already exists!',)
      }
    }
    label = document.createElement('label')
    label.textContent = input.value
    parent.replaceChild(label, input)
    copyTasks[box][id].name = input.value

  }

  return [copyTasks, copyTextInput]
}

const showMessage = (input, copyTasks, copyTextInput, placeholder = "Enter text of the task...") => {
  const cache = input.value
  if (input.previousElementSibling) {
    input.previousElementSibling.style.opacity = '0'
  }
  input.disabled = true
  input.value = ''
  input.classList.add('duplicate')
  input.placeholder = placeholder
  setTimeout(() => {
    input.classList.remove('duplicate')
    input.placeholder = "Enter text of the task..."
    input.value = cache
    if (input.previousElementSibling) {
      input.previousElementSibling.style.opacity = '1'
    }
    input.disabled = false
    input.focus()
  }, 1000)

}

export default reducer