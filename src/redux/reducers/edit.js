const initialState = [{
  green: [/*{name: 'gr', check: false}*/],
  yellow: [/*{name: 'ye', check: false}*/],
  red: [/*{name: 're', check: false}*/]
}, '']

const edit = (state = initialState, action) => {
  console.log(state)
  const copyTasks = {...state[0]}
  let copyTextInput = state[1]

  const {name, box, check, type, id, e, input, placeholder} = action
  console.log(action)

  switch (type) {

    case 'ADD_TASK':
      console.log(copyTextInput, input, box, check)
      if (!input.value.trim().length) return showMessage(input, copyTasks, copyTextInput, placeholder)

      for (let b in copyTasks) {
        if (copyTasks[b].some(el => (el.name === input.value.trim()))) {
          return showMessage(input, copyTasks, copyTextInput, placeholder)
        }
      }

      copyTasks[box].push({name: input.value.trim(), check: check})
      return [copyTasks, copyTextInput]

    case 'EDIT_TASK':
      return editTask(e, id, name, box, copyTasks, copyTextInput)

    case 'ENTERED_TEXT':
      console.log(e.target.value)
      copyTextInput = e.target.value.trim()
      return [copyTasks, copyTextInput]

    case 'SHOW_MESSAGE':
      return showMessage(input, copyTasks, copyTextInput, placeholder)

    case 'TOGGLE_CHECK_TASK':
      copyTasks[box].forEach(el => {
        if (el.name === name) el.check = !el.check
      })
      return [copyTasks, copyTextInput]

    case 'DELETE_TASK':
      copyTasks[box].splice(id, 1)
      return [copyTasks, copyTextInput]

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

  if (e.target.type === 'checkbox') return
  let label
  let input
  let checkbox
  let element = e.target


  switch (e.type) {
    case 'dblclick':
      console.log(element)
      if (element.tagName === 'LABEL') {
        checkbox = element.previousSibling
        label = element
        input = element.nextSibling
        checkbox.classList.add('hide')
        input.classList.remove('hide')
        label.classList.add('hide')
        input.value = label.textContent
        input.focus()
      }
      return [copyTasks, copyTextInput]

    case 'click':
      if (element.tagName === 'B') {
        checkbox = element.previousSibling.previousSibling.previousSibling
        label = element.previousSibling.previousSibling
        const input = element.previousSibling

        if (checkbox.classList.contains('hide')) {
          label.textContent = input.value
          if (!input.value.trim().length) {
            return showMessage(input, copyTasks, copyTextInput)
          }
          for (let b in copyTasks) {
            if (copyTasks[b].some(el => (el.name === input.value.trim() && name !== input.value.trim()))) {
              return showMessage(input, copyTasks, copyTextInput, 'This task already exists!')
            }
          }
          checkbox.classList.remove('hide')
          input.classList.add('hide')
          label.classList.remove('hide')
          copyTasks[box][id].name = input.value

        } else {
          checkbox.classList.add('hide')
          input.classList.remove('hide')
          label.classList.add('hide')
          input.value = label.textContent
          input.focus()
        }
      }
      return [copyTasks, copyTextInput]

    case 'keydown':
      if (element.type === 'text' && e.code === 'Enter') {
        checkbox = element.previousSibling.previousSibling
        label = element.previousSibling
        input = element

        label.textContent = input.value
        if (!input.value.trim().length) {
          return showMessage(input, copyTasks, copyTextInput)
        }
        for (let b in copyTasks) {
          if (copyTasks[b].some(el => (el.name === input.value.trim() && name !== input.value.trim()))) {
            return showMessage(input, copyTasks, copyTextInput, 'This task already exists!')
          }
        }
        checkbox.classList.remove('hide')
        input.classList.add('hide')
        label.classList.remove('hide')
        copyTasks[box][id].name = input.value
      }
      return [copyTasks, copyTextInput]

    default:
      return [copyTasks, copyTextInput]
  }

  /* if (e.type === 'dblclick' && e.target.tagName === 'LABEL') {
     console.log('1 step, dblclick')

     console.log(label.nextSibling);
     input = document.createElement('input')
     checkbox = label.previousSibling

     checkbox.style.display = 'none'
     input.setAttribute('type', 'text')
     input.setAttribute('class', 'edit')
     input.value = label.textContent.trim()
     parent.replaceChild(input, label)
     input.focus()
   } else if (e.target.previousSibling.classList.contains('edit') && e.target.previousSibling.tagName === 'INPUT') {
     const input = e.target.previousSibling
     if (!input.value.trim().length) return showMessage(input, copyTasks, copyTextInput)

     for (let b in copyTasks) {
       if (copyTasks[b].some(el => (el.name === input.value.trim() && name !== input.value.trim()))) {
         return showMessage(input, copyTasks, copyTextInput, 'This task already exists!')
       }
     }

     label = document.createElement('label')
     label.textContent = input.value
     checkbox = input.previousSibling
     checkbox.style.display = 'inline-block'
     console.log(2, checkbox)
     parent.replaceChild(label, input)
     copyTasks[box][id].name = input.value


   } else if (e.target.previousSibling.tagName === 'LABEL') {
     label = e.target.previousSibling
     checkbox = label.previousSibling
     console.log(3, checkbox)
     input = document.createElement('input')
     input.setAttribute('type', 'text')
     input.setAttribute('class', 'edit')
     input.value = label.textContent.trim()
     checkbox.style.display = 'none'
     parent.replaceChild(input, label)
     input.focus()

   } else if (e.code === 'Enter') {
     input = e.target
     checkbox = input.previousSibling
     if (!input.value.trim().length) return showMessage(input, copyTasks, copyTextInput)
     for (let b in copyTasks) {
       if (copyTasks[b].some(el => (el.name === input.value.trim() && name !== input.value.trim()))) {
         return showMessage(input, copyTasks, copyTextInput, 'This task already exists!',)
       }
     }
     label = document.createElement('label')
     label.textContent = input.value
     checkbox.style.display = 'inline-block'
     parent.replaceChild(label, input)
     copyTasks[box][id].name = input.value

   }

   return [copyTasks, copyTextInput]
}*/
}


const showMessage = (input, copyTasks, copyTextInput, placeholder = "Enter text of the task...") => {
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

  return [copyTasks, copyTextInput]
}

export default edit