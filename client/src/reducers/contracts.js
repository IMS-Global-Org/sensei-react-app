const defaults = {
  data: [],
  pagination: {
    total_pages: '',
    current_page: '',
    next_page: '',
  },
  contract: {
    data: {},
  },
  archived: {
    data: [],
    pagination: {
      total_pages: '',
      current_page: '',
      next_page: '',
    },
  },
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
    case 'UPDATE_CONTRACT':
      let index = state.data.findIndex( c => c.id === action.data.id )
      return {
        ...state,
        data: [
          ...state.data.splice(0,index),
          action.data,
          ...state.data.splice(index + 1),
        ],
      }
    case 'CREATE_CONTRACT':
      return {
        ...state,
        data: [
          action.data,
          ...state.data,
        ],
      }
    case 'ARCHIVE_CONTRACT':
      const filtered = state.data.filter( c => c.id !== action.data )
      return {
        ...state,
        data: filtered,
      }
    case 'INDEX_ARCHIVED_CONTRACTS':
      return {
        ...state,
        archived: {
          data: action.data.data,
          pagination: action.data.pagination,
        }
      }
    case 'RESET_ARCHIVED_CONTRACTS':
      return {
        ...state,
        archived: { ...defaults.archived },
      }
    case 'FILTER_CONTRACT_CONTRACTEE':
      index = state.data.findIndex( c =>
        parseInt(c.id,10) === parseInt(action.data.contractId,10)
      )
      const contract = state.data[index]
      const contractees = contract.contractees.filter( c =>
        parseInt(c.id,10) !== parseInt(action.data.contracteeId,10)
      )
      contract.contractees = contractees
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          contract,
          ...state.data.slice(index + 1),
        ]
      }
    default:
      return state
  }
}

export default contracts
