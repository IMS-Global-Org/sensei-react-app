import axios from 'axios'
import { setFlash } from '../flash'
import moment from 'moment'

/**
 * Action for acquiring dates to display in the 'Big Calendar' react component
 * @param {Object} dates - simple object with both start and ending moment objects
 */
export const indexCalendarEvents = ( dates = null ) => {
  let query = null
  // set default two month range for dates
  if( !dates ){
    dates.start = moment.utc().subtract(1,'months')
    dates.finish = moment.utc().add(1,'months')
  }
  // create the query string for acquiring dates from the remote database
  query = `?start=${dates.start.format()}&finish=${dates.finish.format()}`
  // query the remote database
  return (dispatch) => {
    axios.get(`/api/events${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CALENDAR_EVENTS',
        dates: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Calendar Dates Not Found!','error'))
    })
  }
}

/**
 * Action for acquiring paginated events to display in the 'Calendar' component
 * @param {Integer} page - page number of events to acquire
 * @param {Integer} per - number of events to display per page
 * @param {Object} dates - simple object with both start and ending moment objects
 */
export const paginateCalendarEvents = (dates = null, page = 1, per = 5 ) => {
  let query = null
  // set default two month range for dates
  if( !dates ){
    dates.start = moment.utc().subtract(1,'months')
    dates.finish = moment.utc().add(1,'months')
  }
  // create the query string for acquiring dates from the remote database
  query = `?start=${dates.start.format()}&finish=${dates.finish.format()}` +
    `&page=${page}&per=${per}`
  // query the remote database
  return (dispatch) => {
    axios.get(`/api/paginate/events${query}`)
    .then( resp => {
      dispatch({
        type: 'PAGINATE_CALENDAR_EVENTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Calendar Dates Not Found!','error'))
    })
  }
}

/**
 * Obtains a single Calendar events information from the database
 * @param {Integer} eventId - ID number of the single event
 */
export const showCalendarEvent = ( eventId ) => {
  return (dispatch) => {
    axios.get(`/api/events/${eventId}`)
    .then( resp => {
      dispatch({
        type: 'SHOW_CALENDAR_EVENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Calendar Event Information not found!','error'))
    })
  }
}

/**
 * Updates the information for a single calendar event
 * @param {Object} event - single calendar event object
 */
export const updateCalendarEvent = ( event ) => {
  return (dispatch) => {
    axios.patch(`/api/events/${event.id}`)
    .then( resp => {
      dispatch({
        type: 'UPDATE_CALENDAR_EVENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Calendar Event not Updated!','error'))
    })
  }
}

/**
 * Stores a newly created event in the database
 * @param {Object} event - simple event object
 */
export const createCalendarEvent = ( event ) => {
  return (dispatch) => {
    axios.post(`/api/events`, { event } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CALENDAR_EVENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Calendar Event Not Created!','error'))
    })
  }
}

export const clearCalendar = () => {
  return {
    type: 'CLEAR_CALENDAR_EVENTS',
  }
}
