const calendar = ( state = { events: [] }, action ) => {
  switch( action.type ) {
    case 'INDEX_CALENDAR':
      return {
        events: action.data,
      }
    default:
      return state
  }
}

export default calendar
