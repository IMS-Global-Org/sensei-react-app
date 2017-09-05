import axios from 'axios'
import { setFlash } from './flash'

export const indexStudents = ( level, belt, page = 1, per_page = 5 ) => {
  const query = `?page=${page}&per_page=${per_page}&level=${level}&belt=${belt}`
  return (dispatch) => {
    axios.get(`/api/students${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_STUDENTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Students not found!','error')
      )
    })
  }
}

export const queryStudents = ( query ) => {
  return (dispatch) => {
    axios.post(`/api/students/query`, { query })
    .then( resp => {
      dispatch({
        type: 'QUERY_STUDENTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch(
      dispatch(
        setFlash('Students not Queried!','error')
      )
    )
  }
}
