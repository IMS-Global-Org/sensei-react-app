const announcements = ( state = { data: [], pagination: {} }, action ) => {
  switch( action.type ) {
    case 'INDEX_ANNOUNCEMENTS':
      return {
        data: [
          ...state.data,
          ...action.data.data
        ],
        pagination: action.data.pagination,
      }
    default:
      return state
  }
}

export default announcements
