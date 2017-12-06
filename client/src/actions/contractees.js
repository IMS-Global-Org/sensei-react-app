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

export const queryContractees = ( query ) => {
  return (dispatch) => {
    axios.get(`/api/contractees/query?query=${query}`)
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

export const createContractee = ( contractId, contractee ) => {
  return (dispatch) => {
    axios.post(`/api/contracts/${contractId}/create_contractee`, { contractee })
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTRACT_CONTRACTEE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contractee not add to Contract!','error')
      )
    })
  }
}

export const addContractee = ( contractId, contracteeIds, callback = null ) => {
  const query = `?contractees=${contracteeIds.join(',')}`
  return (dispatch) => {
    axios.post(`/api/contracts/${contractId}/add_contractee${query}`)
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

export const updateContractee = ( contractee ) => {
  return (dispatch) => {
    axios.patch(`/api/contractees/${contractee.id}`, { contractee })
    .then( resp => {
      dispatch({
        type: 'UPDATE_CONTRACTEE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contractee not updated!','error')
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

/*******************************************************************
 * Addresses - Actions specifically for modifying the Contractee's
 * addresses.
 *******************************************************************/

export const createAddress = ( contractee, address ) => {
  return (dispatch) => {
    axios.post(`/api/contractees/${contractee}/addresses`,{address})
    .then( resp => {
      dispatch({
        type: 'CREATE_ADDRESS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Address Not Created!','error')
      )
    })
  }
}

export const updateAddress = ( address ) => {
 return (dispatch) => {
   axios.patch(`/api/addresses/${address.id}`,{address})
   .then( resp => {
     dispatch({
       type: 'UPDATE_ADDRESS',
       data: resp.data,
       headers: resp.headers,
     })
   })
   .catch( resp => {
     dispatch(
       setFlash('Address not Updated!','error')
     )
   })
 }
}

/**************************************************************
 * Emails - Actions for Contractee Emails
 *************************************************************/

 export const createEmail = ( contracteeId, email ) => {
  return (dispatch) => {
    axios.post(`/api/contractees/${contracteeId}/emails`,{email})
    .then( resp => {
      dispatch({
        type: 'CREATE_EMAIL',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Email not Created!','error')
      )
    })
  }
 }

 export const updateEmail = ( email ) => {
   return (dispatch) => {
    axios.patch(`/api/emails/${email.id}`,{email})
    .then( resp => {
      dispatch({
        type: 'UPDATE_EMAIL',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Email not Updated!','error')
      )
    })
   }
 }

/*******************************************************************
 * Phones - Actions relating to the Contractee's Phones
 ******************************************************************/

export const createPhone = ( contracteeId, phone ) => {
  return (dispatch) => {
    axios.post(`/api/contractees/${contracteeId}/phones`, {phone})
    .then( resp => {
      dispatch({
        type: 'CREATE_PHONE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Telephone Number not Created!','error')
      )
    })
  }
}

export const updatePhone = ( phone ) => {
  return (dispatch) => {
    axios.patch(`/api/phones/${phone.id}`, {phone})
    .then( resp => {
      dispatch({
        type: 'UPDATE_PHONE',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Telephone Number not Updated!','error')
      )
    })
  }
}
