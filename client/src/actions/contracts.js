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
    axios.delete(`/api/contracts/${contractId}`)
    .then( resp => {
      dispatch({
        type: 'ARCHIVE_CONTRACT',
        data: contractId,
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
export const indexArchivedContracts = ( query = '', page = 1, per = 10 ) => {
  query = `?page=${page}&per=${per}`
  return (dispatch) => {
    axios.get(`/api/contracts/archived${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_ARCHIVED_CONTRACTS',
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

export const resetArchivedContracts = () => {
  return {
    type: 'RESET_ARCHIVED_CONTRACTS',
  }
}

export const queryArchivedContracts = ( query = '', page = 1, per = 10 ) => {
  const pagination = `?page=${page}&per=${per}`
  return (dispatch) => {
    axios.post(`/api/contracts/query_archived${pagination}`, { query })
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

export const filterContractContractee = ( contractId, contracteeId ) => {
  return {
    type: 'FILTER_CONTRACT_CONTRACTEE',
    data: {
      contractId,
      contracteeId,
    }
  }
}
