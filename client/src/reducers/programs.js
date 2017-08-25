const programs = ( state = { data: [], pagination: {} }, action ) => {
  switch( action.type ) {
    case 'INDEX_PROGRAMS':
      return {
        data: action.data.programs,
        pagination: action.data.pagination
      }
    case 'UPDATE_PROGRAM':
      const index = state.data.findIndex( prog => prog.id === action.data.id )
      return {
        data: [
          state.data.slice(0,index),
          action.data,
          state.data.slice(index + 1),
        ],
        ...state,
      }
    default:
      return state
  }
}

export default programs
