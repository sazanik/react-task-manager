const inputValue = (state = '', action) => {
  let copyText = state

  const {type, e} = action

  switch (type) {
    case 'ENTERED_TEXT':
      copyText = e.target.value.trim()
      return copyText

    default:
      return copyText
  }
}

export default inputValue
