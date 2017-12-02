const defaults = {
  data: [],
  pagination: '',
  possibles: [],
  contractee: '',
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
    case 'PAGINATE_CONTRACTEES':
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination,
      }
    case 'CLEAR_CONTRACTEE':
      return {
        ...state,
        contractee: defaults.contractee,
      }
    case 'SHOW_CONTRACTEE':
      return {
        ...state,
        contractee: action.data,
      }
    case 'SHOW_COMPLETE_CONTRACTEE':
      return {
        ...state,
        contractee: action.data,
      }
    default:
      return state
  }
}

export default contractees
