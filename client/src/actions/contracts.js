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

export const resetContract = () => {
  return {
    type: 'RESET_CONTRACT',
  }
}

export const showContract = ( contractId ) => {
  return (dispatch) => {
    axios.get(`/api/contracts/${contractId}/details`)
    .then( resp => {
      dispatch({
        type: 'SHOW_CONTRACT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contract not found!','error')
      )
    })
  }
}

export const archiveContractInfo = ( contractId ) => {
  return ( dispatch ) => {
    axios.delete(`/api/contracts/${contractId}/archive`)
    .then( resp => {
      dispatch({
        type: 'ARCHIVE_CONTRACT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contract not Archived!','error')
      )
    })
  }
}

export const updateContractInfo = ( contract ) => {
  return (dispatch) => {
    axios.patch(`/api/contracts/${contract.id}`, { contract } )
    .then( resp => {
      dispatch({
        type: 'UPDATE_CONTRACT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contract not Updated!','error')
      )
    })
  }
}

export const createContractInfo = ( contract ) => {
  return (dispatch) => {
    axios.post(`/api/contracts`, { contract } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTRACT',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contract not Created!','error')
      )
    })
  }
}

/*
  Actions for Archived Contracts
*/
export const indexArchived = ( page = 1, per = 10 ) => {
  const query = `?page=${page}&per=${per}`
  return (dispatch) => {
    axios.get(`/api/contracts/archived${query}`)
    .then( resp => {
      dispatch({
        type: 'INDED_ARCHIVED',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Archived Contracts not Indexed!','error')
      )
    })
  }
}
