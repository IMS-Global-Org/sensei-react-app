// Default state parameters
const defaults = {
  data: [],
  mailer: {},
}

const mailers = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'INDEX_MAILERS':
      return {
        data: action.data
      }
    case 'SHOW_MAILER':
      return {
        ...state,
        mailer: action.data,
      }
    case 'CLEAR_MAILER':
      return {
        mailer: {}
      }
    case 'CLEAR_MAILERS':
      return {
        ...defaults
      }
    case 'DELETE_MAILER':
      const mailers = state.data.filter( m => m.id !== action.data )
      return {
        ...state,
        data: mailers,
        mailer: {},
      }
    case 'CREATE_MAILER':
      return {
        ...state,
        data: [
          action.data,
          ...state.data,
        ],
      }
    case 'UPDATE_MAILER':
      const index = state.data.findIndex( m => m.id === action.data.id )
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index + 1),
        ],
      }
    default:
      return state
  }
}

export default mailers
