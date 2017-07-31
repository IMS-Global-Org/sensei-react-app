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
    case 'CREATE_ANNOUNCEMENT':
      return {
        ...state,
        data: [
          ...action.data,
          ...state.data,
        ],
      }
    default:
      return state
  }
}

export default announcements
