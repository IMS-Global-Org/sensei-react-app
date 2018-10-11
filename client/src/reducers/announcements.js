const announcements = ( state = { data: [], pagination: {} }, action ) => {
  switch( action.type ) {
    case 'INDEX_ANNOUNCEMENTS':
      return {
        data: [
          ...action.data.data
        ],
        pagination: action.data.pagination,
      }
    case 'CREATE_ANNOUNCEMENT':
      return {
        ...state,
        data: [
          action.data,
          ...state.data,
        ],
      }
    case 'TABLE_ANNOUNCEMENTS':
      return {
        data: [
          ...action.data.data
        ],
        pagination: action.data.pagination,
      }
    case 'UPDATE_ANNOUNCEMENT':
      const index = state.data.findIndex( ann => ann.id === action.data.id )
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index+1),
        ],
      }
    case 'DELETE_ANNOUNCEMENT':
      const dataSet = state.data.filter( ann => ann.id !== action.data )
      return {
        ...state,
        data: dataSet,
      }
    case 'EMPTY_REDUX_ANNOUNCEMENTS':
      return {
        data: [],
        pagination: {},
      }
    default:
      return state
  }
}

export default announcements
