const tablePostings = ( state = { data: [], pagination: {} }, action ) => {
  switch( action.type ) {
    case 'INDEX_TABLE_POSTINGS':
      return {
        data: action.data.data,
        pagination: action.data.pagination
      }
    case 'EMPTY_REDUX_POSTINGS':
      return { data: [], pagination: {} }
    default:
      return state
  }
}

export default tablePostings
