import axios from 'axios'
import { setFlash } from './flash'

export const indexContractees = ( contractId ) => {
  return (dispatch) => {
    axios.get(`/api/contracts/${contractId}/contractees`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CONTRACT_CONTRACTEES',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contract Contractees not Indexex!','error')
      )
    })
  }
}

export const paginateContractees = ( page = 1, per_page = 5 ) => {
  const query = `?page=${page}&per_page=${per_page}`
  return (dispatch) => {
    axios.get(`/api/contractees/paginate${query}`)
    .then( resp => {
      dispatch({
        type: 'PAGINATE_CONTRACTEES',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contractees not Paginated!','error')
      )
    })
  }
}

export const queryContractees = ( contractId, query ) => {
  query = `?query=${query}`
  return (dispatch) => {
    axios.get(`/api/contracts/${contractId}/contractees/query${query}`)
    .then( resp => {
      dispatch({
        type: 'QUERY_CONTRACTEES',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contractees not Queried!','error')
      )
    })
  }
}

export const createContractee = ( contractId, contracteeIds, callback = null ) => {
  const query = `?contractees=${contracteeIds.join(',')}`
  return (dispatch) => {
    axios.patch(`/api/contracts/${contractId}/create_contractee${query}`)
    .then( resp => {
      dispatch({
        type: 'ADD_CONTRACT_CONTRACTEE',
        data: resp.data,
        headers: resp.headers,
      })
      if( callback ) {
        callback()
      }
    })
    .catch( resp => {
      dispatch(
        setFlash('Contractee not add to Contract!','error')
      )
    })
  }
}

export const deleteContractee = ( contractId, contracteeId ) => {
  const query = `?contractee=${contracteeId}`
  return (dispatch) => {
    axios.patch(`/api/contracts/${contractId}/delete_contractee${query}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_CONTRACT_CONTRACTEE',
        data: contracteeId,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contract contractee not Removed!','error')
      )
    })
  }
}

export const clearContractees = () => {
  return {
    type: 'CLEAR_CONTRACT_CONTACTEES',
  }
}

export const clearContractee = () => {
  return {
    type: 'CLEAR_CONTRACTEE',
  }
}

export const showContractee = ( contracteeId, callback = null ) => {
  return (dispatch) => {
    axios.get(`/api/contractees/${contracteeId}`)
    .then( resp => {
      dispatch({
        type: 'SHOW_CONTRACTEE',
        data: resp.data,
        headers: resp.headers,
      })
      if( callback ) { callback() }
    })
    .catch( resp => {
      dispatch(
        setFlash('Contractee not Shown!','error')
      )
    })
  }
}

export const showCompleteContractee = ( contracteeId ) => {
  return (dispatch) => {
    axios.get(`/api/contractees/${contracteeId}/show_complete`)
    .then( resp => {
      dispatch({
        type: 'SHOW_COMPLETE_CONTRACTEE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Complete Contractee not Shown!','error')
      )
    })
  }
}
