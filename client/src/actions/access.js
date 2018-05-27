import axios from 'axios'
import { setFlash } from './flash'

export const indexClientList = (page = 1, per_page = 5) => {
  const pagination = `?page=${page}&per_page=${per_page}`
  return dispatch => {
    axios.get(`/api/client_lists${pagination}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CLIENT_LIST',
        clients: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Client List Not Indexed!','error')
      )
    })
  }
}

export const updateClientList = ( clientId, permissions, callback = null ) => {
  return dispatch => {
    axios.patch(`/api/client_lists/${clientId}`, { permissions })
    .then( resp => {
      dispatch({
        type: 'UPDATE_CLIENT_LIST',
        client: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Client List Permissions Not Updated!','error')
      )
    })
  }
}

export const queryClientList = ( search ) => {
  const query = `?name=${search.name}&email=${search.email}`
  return dispatch => {
    axios.get(`/api/client_lists/query${query}`)
    .then( resp => {
      dispatch({
        type: 'QUERY_CLIENT_LIST',
        clients: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Client List Not Queried!','error')
      )
    })
  }
}
