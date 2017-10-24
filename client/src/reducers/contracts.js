const defaults = {
  data: [],
  pagination: {
    total_pages: '',
    current_page: '',
    next_page: '',
  },
}

const contracts = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'RESET_CONTRACT':
      return { ...defaults }
    case 'INDEX_CONTRACTS':
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination
      }
    case 'QUERY_CONTRACTS':
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination
      }
    default:
      return state
  }
}

export default contracts
