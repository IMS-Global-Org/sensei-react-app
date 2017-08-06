import axios from 'axios'
import { setFlash } from './flash'

/**
 * Retrieves a set of postings in a specific format for displaying in table form
 * @param {Integer} page - page number respresenting the posting set to retrieve
 * @param {Integer} per - number of posting per page to retrieve
 * @param {Function} callback - callback function to execute
 */
export const indexTablePostings = ( page, per = 10, callback = null ) => {
  return (dispatch) => {
    axios.get(``)
    .then( resp => {
      dispatch({
        type: 'INDEX_TABLE_POSTINGS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .then( () => {
      if( callback )
        callback()
    })
    .catch( resp => {
      dispatch(setFlash('Table Postings Not Found!','error'))
    })
  }
}
