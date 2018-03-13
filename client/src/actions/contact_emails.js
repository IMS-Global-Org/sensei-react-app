import axios from 'axios'
import { setFlash } from './flash'

export const indexContactEmails = ( page = 1, per_page = 5 ) => {
  const query = `?page=${page}&per_page=${per_page}`
  return dispatch => {
    axios.get(`/api/contact_emails${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_CONTACT_EMAILS',
        emails: resp.data.data,
        pagination: resp.data.pagination,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contact E-mails not Found!', 'error')
      )
    })
  }
}

export const createContactEmail = ( contact_email, cb = '' ) => {
  return dispatch => {
    axios.post(`/api/contact_emails`, { contact_email } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTACT_EMAIL',
        email: resp.data,
        headers: resp.headers,
      })
      if( cb ) { cb() }
    })
    .catch( resp => {
      dispatch(
        setFlash('Contact Email Not Sent!','error')
      )
    })
  }
}

export const updateContactEmail = ( id, contact_email ) => {
  return dispatch => {
    axios.patch(`/api/contact_emails/${id}`,{ contact_email })
    .then( resp => {
      dispatch({
        type: 'UPDATE_CONTACT_EMAIL',
        email: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Contact Email Not Updated!','error')
      )
    })
  }
}
