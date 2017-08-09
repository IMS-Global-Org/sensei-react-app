const tablePostings = ( state = { data: [], pagination: {} }, action ) => {
  switch( action.type ) {
    case 'INDEX_POSTINGS_TABLE':
      return {
        data: action.data.data,
        pagination: action.data.pagination
      }
    case 'EMPTY_REDUX_POSTINGS':
      return { data: [], pagination: {} }
    case 'SHOW_POSTINGS_TABLE':
      return {
        ...state,
        activePosting: action.data
      }
    default:
      return state
  }
}

export default tablePostings
