const defaults = {
  data: [],
  pagination: '',
  possibles: [],
  contractee: '',
}

const contractees = ( state = defaults, action ) => {
  let index
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
    case 'UPDATE_CONTRACTEE':
      index = state.data.findIndex( c =>
        c.id === action.data.id
      )
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index + 1),
        ],
        contractee: {
          ...state.contractee,
          ...action.data,
        },
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
    case 'CREATE_ADDRESS':
      return {
        ...state,
        contractee: {
          ...state.contractee,
          addresses: [
            action.data,
            ...state.contractee.addresses,
          ],
        },
      }
    case 'UPDATE_ADDRESS':
      index = state.contractee.addresses.findIndex( a =>
        a.id === action.data.id
      )
      return {
        ...state,
        contractee: {
          ...state.contractee,
          addresses: [
            ...state.contractee.addresses.slice(0,index),
            action.data,
            ...state.contractee.addresses.slice(index + 1),
          ],
        },
      }
    case 'CREATE_EMAIL':
      return {
        ...state,
        contractee: {
          ...state.contractee,
          emails: [
            action.data,
            ...state.contractee.emails,
          ],
        },
      }
    case 'UPDATE_EMAIL':
      index = state.contractee.emails.findIndex( e =>
        e.id === action.data.id
      )
      return {
        ...state,
        contractee: {
          ...state.contractee,
          emails: [
            ...state.contractee.emails.slice(0,index),
            action.data,
            ...state.contractee.emails.slice(index + 1),
          ],
        },
      }
    case 'CREATE_PHONE':
      return {
        ...state,
        contractee: {
          ...state.contractee,
          phones: [
            action.data,
            ...state.contractee.phones,
          ],
        },
      }
    case 'UPDATE_PHONE':
      index = state.contractee.phones.findIndex( p =>
        p.id === action.data.id
      )
      return {
        ...state,
        contractee: {
          ...state.contractee,
          phones: [
            ...state.contractee.phones.slice(0,index),
            action.data,
            ...state.contractee.phones.slice(index + 1),
          ],
        },
      }
    default:
      return state
  }
}

export default contractees
