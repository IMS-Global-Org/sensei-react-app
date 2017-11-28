const defaults = {
  data: [],
  possibles: [],
}

const contractees = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'QUERY_CONTRACTEES':
      return {
        ...state,
        possibles: action.data,
      }
    case 'ADD_CONTRACT_CONTRACTEE':
      return {
        ...state,
        data: [
          action.data,
          ...state.data,
        ],
      }
    case 'CLEAR_CONTRACT_CONTACTEES':
      return { ...defaults }
    default:
      return state
  }
}

export default contractees
