const calendar = ( state = { events: [] }, action ) => {
  switch( action.type ) {
    case 'INDEX_CALENDAR':
      return {
        events: action.dates,
      }
    default:
      return state
  }
}

export default calendar
