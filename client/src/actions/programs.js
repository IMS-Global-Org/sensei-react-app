import axios from 'axios'
import { setFlash } from './flash'

/**
 * Retrieves a set of programs for displaying
 * @param {Integer} page - page number corresponding to the program set
 * @param {Integer} per_page - number of programs per set to retrieve
 */
export const indexPrograms = ( page = 1, per_page = 5 ) => {
  const query = `?page=${page}&per_page=${per_page}`
  return (dispatch) => {
    axios.get(`/api/programs${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_PROGRAMS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Programs not available!','error')
      )
    })
  }
}

export const updateProgram = ( program ) => {
  return (dispatch) => {
    axios.patch(`/api/programs/${program.id}`, { program })
    .then( resp => {
      dispatch({
        type: 'UPDATE_PROGRAM',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Program Info Not Updated!','error')
      )
    })
  }
}

export const createProgram = ( program ) => {}
