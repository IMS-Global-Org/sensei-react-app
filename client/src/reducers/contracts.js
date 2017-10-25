const defaults = {
  data: [],
  pagination: {
    total_pages: '',
    current_page: '',
    next_page: '',
  },
  contract: {
    data: {},
  }
}

const contracts = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'RESET_CONTRACTS':
      return { ...defaults }
    case 'RESET_CONTRACT':
      return {
        ...state,
        contract: { data: {} },
      }
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
    case 'SHOW_CONTRACT':
      return {
        ...state,
        contract: {
          data: action.data,
        }
      }
    default:
      return state
  }
}

export default contracts
