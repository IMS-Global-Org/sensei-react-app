import axios from 'axios'
import { setFlash } from './flash'

/**
 * Retrieves a set of postings in a specific format for displaying in table form
 * @param {Integer} page - page number respresenting the posting set to retrieve
 * @param {Integer} per - number of posting per page to retrieve
 * @param {Function} callback - callback function to execute
 */
export const indexPostingsTable = ( page = 1, per = 5, callback = null ) => {
  const query = `?page=${page}&per=${per}`
  return (dispatch) => {
    axios.get(`/api/postings_tables${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_POSTINGS_TABLE',
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

export const emptyReduxPostings = () => {
  return {
    type: 'EMPTY_REDUX_POSTINGS',
  }
}

export const showPostingsTable = ( id ) => {
  return (dispatch) => {
    axios.get(`/api/postings_tables/${id}`)
    .then( resp => {
      dispatch({
        type: 'SHOW_POSTINGS_TABLE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Posting Not Located!','error'))
    })
  }
}
