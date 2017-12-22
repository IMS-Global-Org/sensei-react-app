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

export const createPost = ( post ) => {
  return (dispatch) => {
    axios.post(`/api/home_page_postings`,{ home_page_posting: post })
    .then( resp => {
      dispatch({
        type: 'CREATE_POST',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Post not Created!','error')
      )
    })
  }
}

export const updatePost = ( post ) => {
  return (dispatch) => {
    axios.patch(`/api/home_page_postings/${post.id}`, { home_page_posting: post })
    .then( resp => {
      dispatch({
        type: 'UPDATE_POST',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Post not Updated!','error')
      )
    })
  }
}

export const deletePost = ( postId ) => {
  return (dispatch) => {
    axios.delete(`/api/home_page_postings/${postId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_POST',
        data: postId,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Post not Deleted!','error')
      )
    })
  }
}

/****************************************************
 * Actions for handling a single video object
 ***************************************************/
export const createVideo = ( postId, home_page_video ) => {
  return dispatch => {
    axios.post(
      `/api/home_page_postings/${postId}/home_page_videos/`,
      { home_page_video }
    )
    .then( resp => {
      dispatch({
        type: 'CREATE_VIDEO',
        data: resp.data,
        header: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Home Page Video not Created!','error')
      )
    })
  }
}

export const updateVideo = ( home_page_video ) => {
  return dispatch => {
    axios.patch(
      `/api/home_page_videos/${home_page_video.id}`,
      { home_page_video }
    )
    .then( resp => {
      dispatch({
        type: 'UPDATE_VIDEO',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Home Page Video not Updated!','error')
      )
    })
  }
}

export const deleteVideo = ( videoId ) => {
  return dispatch => {
    axios.delete(`/api/home_page_videos/${videoId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_VIDEO',
        data: videoId,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Home Page Video not Delete!','error')
      )
    })
  }
}

/****************************************************
 * Actions for handling a single link object
 ***************************************************/
export const createLink = ( postId, home_page_link ) => {
  return dispatch => {
    axios.post(
      `/api/home_page_postings/${postId}/home_page_links/`,
      { home_page_link }
    )
    .then( resp => {
      dispatch({
        type: 'CREATE_LINK',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Home Page Link not Created!','error')
      )
    })
  }
}

export const updateLink = ( home_page_link ) => {
  return dispatch => {
    axios.patch(
      `/api/home_page_links/${home_page_link.id}`,
      { home_page_link }
    )
    .then( resp => {
      dispatch({
        type: 'UPDATE_LINK',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Home Page Link not Updated!','error')
      )
    })
  }
}

export const deleteLink = ( linkId ) => {
  return dispatch => {
    axios.delete(`/api/home_page_links/${linkId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_LINK',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Home Page Link not Deleted!','error')
      )
    })
  }
}
