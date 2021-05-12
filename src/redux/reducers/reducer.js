const initialState = {
  green: [/*{name: 'gr', check: false}*/],
  yellow: [/*{name: 'ye', check: false}*/],
  red: [/*{name: 're', check: false}*/]
}

const reducer = (state = initialState, action) => {
  const copyTasks = {...state}

  const {name, box, check, type, id, e, input, placeholder} = action
  console.log(action)

  switch (type) {

    case 'ADD_TASK':
      if (!input.value.trim().length) return showMessage(input, copyTasks, placeholder)

      for (let b in copyTasks) {
        if (copyTasks[b].some(el => (el.name === input.value.trim()))) {
          return showMessage(input, copyTasks, placeholder)
        }
      }

      copyTasks[box].push({name: input.value.trim(), check: check})
      return {...copyTasks}

    case 'EDIT_TASK':
      return editTask(e, id, name, box, copyTasks, )

    case 'CLEAR_INPUT':
      input.value = ''
      return {...copyTasks}

    case 'SHOW_MESSAGE':
      return showMessage(input, copyTasks, placeholder)

    case 'TOGGLE_CHECK_TASK':
      copyTasks[box].forEach(el => {
        if (el.name === name) el.check = !el.check
      })
      return {...copyTasks}

    case 'DELETE_TASK':
      copyTasks[box].splice(id, 1)
      return {...copyTasks}

    case 'TOGGLE_VISIBLE_LIST':
      let list = e.target.nextSibling
      let title = e.target

      if (e.type === "submit") {
        list = e.target.previousSibling
        title = list.previousSibling
        title.textContent = 'HIDE'
        list.classList.remove('hide-list')
      } else {
        list.classList.toggle('hide-list')
        if (list.classList.contains('hide-list')) title.textContent = 'SHOW'
        else title.textContent = 'HIDE'
      }
      return {...copyTasks}

    default:
      return {...copyTasks}
  }
}

const editTask = (e, id, name, box, copyTasks) => {

  if (e.target.type === 'checkbox') return
  let label
  let input
  let checkbox
  let element = e.target


  switch (e.type) {
    case 'dblclick':
      if (element.tagName === 'LABEL') {
        checkbox = element.previousSibling
        label = element
        input = element.nextSibling
        checkbox.classList.add('disabled')
        input.classList.remove('disabled')
        label.classList.add('disabled')
        input.value = label.textContent
        input.focus()
      }
      return {...copyTasks}

    case 'click':
      if (element.tagName === 'B') {
        checkbox = element.previousSibling.previousSibling.previousSibling
        label = element.previousSibling.previousSibling
        const input = element.previousSibling

        if (checkbox.classList.contains('disabled')) {
          label.textContent = input.value
          if (!input.value.trim().length) {
            return showMessage(input, copyTasks)
          }
          for (let b in copyTasks) {
            if (copyTasks[b].some(el => (el.name === input.value.trim() && name !== input.value.trim()))) {
              return showMessage(input, copyTasks, 'This task already exists!')
            }
          }
          checkbox.classList.remove('disabled')
          input.classList.add('disabled')
          label.classList.remove('disabled')
          copyTasks[box][id].name = input.value

        } else {
          checkbox.classList.add('disabled')
          input.classList.remove('disabled')
          label.classList.add('disabled')
          input.value = label.textContent
          input.focus()
        }
      }
      return {...copyTasks}

    case 'keydown':
      if (element.type === 'text' && e.code === 'Enter') {
        checkbox = element.previousSibling.previousSibling
        label = element.previousSibling
        input = element

        label.textContent = input.value
        if (!input.value.trim().length) {
          return showMessage(input, copyTasks)
        }
        for (let b in copyTasks) {
          if (copyTasks[b].some(el => (el.name === input.value.trim() && name !== input.value.trim()))) {
            return showMessage(input, copyTasks, 'This task already exists!')
          }
        }
        checkbox.classList.remove('disabled')
        input.classList.add('disabled')
        label.classList.remove('disabled')
        copyTasks[box][id].name = input.value
      }
      return {...copyTasks}

    default:
      return {...copyTasks}
  }
}


const showMessage = (input, copyTasks, placeholder = "Enter text of the task...") => {
  const cache = input.value

  input.classList.add('duplicate')
  input.placeholder = placeholder
  input.disabled = true
  input.value = ''

  setTimeout(() => {
    input.classList.remove('duplicate')
    input.placeholder = "Enter text of the task..."
    input.disabled = false
    input.value = cache
    input.focus()
  }, 1000)

  return {...copyTasks}
}

export default reducer