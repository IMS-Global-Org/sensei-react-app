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

export const queryStudents = ( query, page = 1, per_page = 5 ) => {
  const query_str = `?page=${page}&per_page=${per_page}`
  return (dispatch) => {
    axios.post(`/api/students/query${query_str}`, { query } )
    .then( resp => {
      dispatch({
        type: 'QUERY_STUDENTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Students Not Found!','error')
      )
    })
  }
}

export const showStudent = ( student_id ) => {
  return (dispatch) => {
    axios.get(`/api/students/${student_id}`)
    .then( resp => {
      dispatch({
        type: 'SHOW_STUDENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('No Student Information Located!','error')
      )
    })
  }
}

export const clearStudent = () => {
  return {
    type: 'CLEAR_STUDENT'
  }
}

export const updateStudent = ( student ) => {
  // House Cleaning
  delete student.created_at
  delete student.updated_at

  return (dispatch) => {
    axios.patch(`/api/students/${student.id}`, { student })
    .then( resp => {
      dispatch({
        type: 'UPDATE_STUDENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Student Not Updated!','error')
      )
    })
  }
}

export const createStudent = ( student ) => {
  return (dispatch) => {
    axios.post(`/api/students`, { student })
    .then( resp => {
      dispatch({
        type: 'CREATE_STUDENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Student Not Created!','error')
      )
    })
  }
}
