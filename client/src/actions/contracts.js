import axios from 'axios'
import { setFlash } from './flash'

export const indexContracts = ( page = 1, per = 10 ) => {
  const query = `?page=${page}&per=${per}`
  return (dispatch) => {
    axios.get(`/api/contracts${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CONTRACTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contracts not found!','error')
      )
    })
  }
}

export const resetContracts = () => {
  return {
    type: 'RESET_CONTRACTS',
  }
}

export const queryContracts = ( query, page = 1, per = 10 ) => {
  const pagination = `?page=${page}&per=${per}`
  return (dispatch) => {
    axios.post(`/api/contracts/query${pagination}`, { query })
    .then( resp => {
      dispatch({
        type: 'QUERY_CONTRACTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contracts not found!','error')
      )
    })
  }
}
