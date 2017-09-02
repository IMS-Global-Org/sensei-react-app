import axios from 'axios'
import { setFlash } from './flash'

export const indexRequirements = (progId, page = 1, per_page = 5 ) => {
  const query = `?page=${page}&per_page=${per_page}&prog_id=${progId}`
  return (dispatch) => {
    axios.get(`/api/requirements${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_REQUIREMENTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Requirements not found!','error')
      )
    })
  }
}

export const showRequirement = ( reqId ) => {
  return (dispatch) => {
    axios.get(`/api/requirements/${reqId}`)
    .then( resp => {
      dispatch({
        type: 'SHOW_REQUIREMENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Requirement Not found!','error')
      )
    })
  }
}

export const updateRequirement = ( requirement ) => {
  return (dispatch) => {
    axios.patch(`/api/requirements/${requirement.id}`, {requirement} )
    .then( resp => {
      dispatch({
        type: 'UPDATE_REQUIREMENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Requirement not updated!','error')
      )
    })
  }
}

export const createRequirement = ( requirement ) => {
  return (dispatch) => {
    axios.post(`/api/requirements`, {requirement} )
    .then( resp => {
      dispatch({
        type: 'CREATE_REQUIREMENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Requirement not created!','error')
      )
    })
  }
}

export const deleteRequirement = ( requirementId ) => {
  return (dispatch) => {
    axios.delete(`/api/requirements/${requirementId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_REQUIREMENT',
        data: requirementId,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Requirement not delete!','error')
      )
    })
  }
}

export const clearRequirements = () => {
  return {
    type: 'CLEAR_REQUIREMENTS',
  }
}
