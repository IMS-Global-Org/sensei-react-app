const calendar = ( state = { events: [], activeEvent: null, paginate: {} }, action ) => {
  switch( action.type ) {
    case 'INDEX_CALENDAR_EVENTS':
      return {
        events: action.dates,
      }
    case 'PAGINATE_CALENDAR_EVENTS':
      return {
        events: action.data.events,
        paginate: action.data.paginate,
      }
    case 'SHOW_CALENDAR_EVENT':
      return {
        ...state,
        activeEvent: action.data,
      }
    case 'UPDATE_CALENDAR_EVENT':
      // FIXME update for updating a single event from the list of calendar events
      return {
        ...state,
        activeEvent: action.data,
      }
    case 'CREATE_CALENDAR_EVENT':
      return {
        ...state,
        events: [
          ...state.events,
          action.data
        ],
      }
    case 'CLEAR_CALENDAR_EVENTS':
      return {
        events: [],
        activeEvent: null,
      }
    default:
      return state
  }
}

export default calendar
