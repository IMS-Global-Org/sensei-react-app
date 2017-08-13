import axios from 'axios'
import { setFlash } from '../flash'
import moment from 'moment'

/**
 * Action for acquiring dates to display in the 'Big Calendar' react component
 * @param {Object} dates - simple object with both start and ending moment objects
 */
export const indexCalendar = ( dates = null ) => {
  let query = null
  // set default two month range for dates
  if( !dates ){
    dates.start = moment.utc().subtract(1,'months')
    dates.end = moment.utc().add(1,'months')
  }
  // create the query string for acquiring dates from the remote database
  query = `?start_date=${dates.start}&end_date=${dates.end}`
  // query the remote database
  return (dispatch) => {
    axios.get(`/api/calendar${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CALENDAR',
        dates: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Calendar Dates Not Found!','error'))
    })
  }
}
