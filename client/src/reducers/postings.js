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
    case 'UPDATE_POSTINGS_TABLE':
      const index = state.data.findIndex( posting => {
        return posting.id === action.data.id
      })
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index+1),
        ]
      }
    case 'CREATE_POSTINGS_TABLE':
    default:
      return state
  }
}

export default tablePostings
