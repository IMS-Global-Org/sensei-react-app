const defaults = {
  data: [],
  possibles: [],
}

const contractees = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'INDEX_CONTRACT_CONTRACTEES':
      return {
        ...state,
        data: action.data,
      }
    case 'QUERY_CONTRACTEES':
      return {
        ...state,
        possibles: action.data,
      }
    case 'ADD_CONTRACT_CONTRACTEE':
      return {
        ...state,
        data: action.data,
      }
    case 'DELETE_CONTRACT_CONTRACTEE':
      const filtered = state.data.filter( cc => cc.id !== action.data )
      return {
        ...state,
        data: filtered,
      }
    case 'CLEAR_CONTRACT_CONTACTEES':
      return { ...defaults }
    default:
      return state
  }
}

export default contractees
