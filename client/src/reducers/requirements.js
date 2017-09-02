const requirements = ( state = { data: [], pagination: {} } , action ) => {
  switch( action.type ) {
    case 'INDEX_REQUIREMENTS':
      // pagination is part of the data object
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination,
      }
    case 'UPDATE_REQUIREMENT':
      const index = state.data.findIndex( req => req.id === action.data.id )
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index + 1),
        ]
      }
    case 'CLEAR_REQUIREMENTS':
      return {
        data: [],
        pagination: {},
      }
    case 'DELETE_REQUIREMENT':
      const new_data = state.data.filter( req => req.id !== action.data )
      return {
        ...state,
        data: new_data,
      }
    case 'CREATE_REQUIREMENT':
      return {
        ...state,
        data: [
          action.data,
          ...state.data,
        ]
      }
    default:
      return state
  }
}

export default requirements
