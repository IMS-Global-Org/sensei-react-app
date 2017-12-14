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

export const clearActivePosting = () => {
  return {
    type: 'CLEAR_ACTIVE_POSTING',
  }
}

export const showPostingsTable = ( id, cb = null ) => {
  return (dispatch) => {
    axios.get(`/api/postings_tables/${id}`)
    .then( resp => {
      dispatch({
        type: 'SHOW_POSTINGS_TABLE',
        data: resp.data,
        headers: resp.headers,
      })
      if( cb ) { cb() }
    })
    .catch( resp => {
      dispatch(setFlash('Posting Not Located!','error'))
    })
  }
}

export const updatePostingsTable = ( formData ) => {
  return (dispatch) => {
    axios.patch(
      `/api/postings_tables/${formData.id}`,
      {home_page_posting: formData } )
    .then( resp => {
      dispatch({
        type: 'UPDATE_POSTINGS_TABLE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Posting Not Updated!','error'))
    })
  }
}

export const createPostingsTable = ( formData ) => {
  return (dispatch) => {
    axios.post(`/api/postings_tables`, { home_page_posting: formData } )
    .then( resp => {
      dispatch({
        type: 'CREATE_POSTINGS_TABLE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(setFlash('Posting Not Created!','error'))
    })
  }
}

/****************************************************
 * Actions for handling a single post object with
 * no adjoining links or videos
 ***************************************************/

export const createPost = ( post ) => {}
export const updatePost = ( post ) => {}
export const deletePost = ( postId ) => {}

/****************************************************
 * Actions for handling a single video object
 ***************************************************/
export const createVideo = ( video ) => {}
export const updateVideo = ( video ) => {}
export const deleteVideo = ( videoId ) => {}

/****************************************************
 * Actions for handling a single link object
 ***************************************************/
export const createLink = ( link ) => {}
export const updateLink = ( link ) => {}
export const deleteLink = ( link ) => {}
