const initialState =
  {
    green: [{name: 'green', check: false}],
    yellow: [{name: 'yellow', check: false}],
    red: [{name: 'red', check: false}]
  }

const taskReducer = (state = initialState, action) => {
  const copyStore = {...state}
  const {name, box, check, type} = action

  switch (type) {
    case 'ADD_TASK':
      copyStore[box].push({name: name, check: check})
      return copyStore

    default:
      return state
  }
}


export default taskReducer