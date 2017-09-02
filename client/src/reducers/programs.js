const programs = ( state = { data: [], pagination: {}, requirements: [] }, action ) => {
  switch( action.type ) {
    case 'INDEX_PROGRAMS':
      return {
        data: action.data.programs,
        pagination: action.data.pagination
      }
    case 'UPDATE_PROGRAM':
      const index = state.data.findIndex( prog => prog.id === action.data.id )
      action.data.num_req = state.data[index].num_req
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index + 1),
        ],
      }
    case 'CREATE_PROGRAM':
      return {
        ...state,
        data: [
          action.data,
          ...state.data,
        ],
      }
    case 'DELETE_PROGRAM':
      const new_data = state.data.filter( prog => prog.id !== action.data )
      return {
        ...state,
        data: new_data,
      }
    default:
      return state
  }
}

export default programs
