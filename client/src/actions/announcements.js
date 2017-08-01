import axios from 'axios'
import { setFlash } from './flash'

/**
 * Retrieves record sets by page for displaying only
 * @param {Integer} page - page number or set to display
 * @param {Integer} per - number of announceents to return per page
 * @param {Function} callback - callback function
 */
export const indexAnnouncements = ( page = 1, per = 5, callback = null ) => {
  const query = `page=${page}&per=${per}`
  return (dispatch) => {
    axios.get(`/api/announcements?${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_ANNOUNCEMENTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('No New Announcements Loaded!','error'))
    })
  }
}

/**
 * Sends an announcement data set to be updated in the database
 * @param {Object} data - data object with all the Announcement fields data
 */
export const updateAnnouncement = ( data ) => {
  return (dispatch) => {
    axios.patch(`/api/announcements/${data.id}`, { announcement: data })
    .then( resp => {
      dispatch({
        type: 'UPDATE_ANNOUNCEMENT',
        data: resp.data,
        headers: resp.headers,
      })
      dispatch(setFlash('Announcement Successfully Updated!','success'))
    })
    .catch( resp => {
      dispatch(setFlash('Announcement Not Updated!','error'))
    })
  }
}

/**
 * Sends an announcement data set for newly creating in the database
 * @param {Object} data - data object with all the Announcement fields data
 */
export const createAnnouncement = ( data ) => {
  return (dispatch) => {
    axios.post(`/api/announcements`, { announcement: data })
    .then( resp => {
      dispatch({
        type: 'CREATE_ANNOUNCEMENT',
        data: resp.data,
        headers: resp.headers,
      })
      dispatch(setFlash('Announcement Successfully Created!','success'))
    })
    .catch( resp => {
      dispatch(setFlash('Announcement Not Created!','error'))
    })
  }
}

/**
 * Retrieves record sets by page for displaying in Table format only
 * @param {Integer} page - page number or set to display
 * @param {Integer} per - number of announceents to return per page
 * @param {Function} callback - callback function
 */
export const tableAnnouncements = ( page = 1, per = 5, callback = null ) => {
  const query = `page=${page}&per=${per}`
  return (dispatch) => {
    axios.get(`/api/announcements?${query}`)
    .then( resp => {
      dispatch({
        type: 'TABLE_ANNOUNCEMENTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('No New Announcements Loaded!','error'))
    })
  }
}
