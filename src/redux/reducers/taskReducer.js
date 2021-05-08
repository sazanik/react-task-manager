const initialState =
  {
    green: [{name: 'green', check: false}],
    yellow: [{name: 'yellow', check: false}],
    red: [{name: 'red', check: false}]
  }

function taskReducer(store = initialState, action) {
  console.log(action)
  const {name, box, check, type} = action
  const copyStore = {...store}
  switch (type) {
    case 'ADD_TASK':
      copyStore[box].push({name: name, check: check})
      return copyStore
    
    default:
      return store
  }
}

export default taskReducer