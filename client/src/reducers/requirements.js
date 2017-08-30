const requirements = ( state = { data: [], pagination: {} } , action ) => {
  switch( action.type ) {
    case 'INDEX_REQUIREMENTS':
      // pagination is part of the data object
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination,
      }
    case 'CLEAR_REQUIREMENTS':
      return {
        data: [],
        pagination: {},
      }
    case 'DELETE_REQUIREMENT':
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}

export default requirements
