import axios from 'axios'
import { setFlash } from './flash'

/**
 * Loads a new set of postings according to the page number that is submitted
 * @param {Integer} page - the actual page number to load
 * @param {Integer} per - the number of components to load per page
 * @param {Function} callback - optional; callback function
 * @return {Object} the json data object
 */
export const indexPostings = ( page = 1, per = 5, callback = null ) => {
  const query = `?page=${page}&per=${per}`
  return (dispatch) => {
    axios.get(`/api/home_page_postings${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_POSTINGS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .then( () => {
      if( callback )
        callback()
    })
    .catch( resp => {
      dispatch(setFlash('Postings not found!','error'))
    })
  }
}

/**
 * Clears any remaining postings from the redux store
 */
export const emptyReduxPostings = () => {
  return {
    type: 'EMPTY_REDUX_POSTINGS',
  }
}
