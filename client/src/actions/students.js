import axios from 'axios'
import fileDownload from 'react-file-download'
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

export const deleteStudent = ( id ) => {
  return (dispatch) => {
    axios.delete(`/api/students/${id}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_STUDENT',
        data: {id},
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Student Not Deleted!','error')
      )
    })
  }
}

export const inactivateStudent = ( id ) => {
  return (dispatch) => {
    axios.patch(`/api/students/inactivate`)
    .then( resp => {
      dispatch({
        type: 'INACTIVATE_STUDENT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Student Not Inactivated!','error')
      )
    })
  }
}

export const pdfStudents = ( query ) => {
  return (dispatch) => {
    axios.get(`/api/students/pdf`,
    {
      params: query,
      headers: {'Content-Type': 'application/octet-stream'},
    })
    .then( resp => {
      const file_name=resp.headers['content-disposition'].split(';').map(x=> x.trim())[1].split('=')[1]
      fileDownload(resp.data,file_name)
    })
    .catch( resp => {
      dispatch(
        setFlash('Student PDF Listing not Created!','error')
      )
    })
  }
}

export const csvStudents = ( query ) => {
  return (dispatch) => {
    axios.post(`/api/students/csv`, { query })
    .then( resp => {
      const file_name=resp.headers['content-disposition'].split(';').map(x=> x.trim())[1].split('=')[1]
      fileDownload(resp.data,file_name)
    })
    .catch( resp => {
      dispatch(
        setFlash('Student CSV Listing not Created!','error')
      )
    })
  }
}

export const clearStudents = () => {
  return {
    type: 'CLEAR_STUDENTS',
  }
}
