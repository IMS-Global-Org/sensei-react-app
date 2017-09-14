import axios from 'axios'
import { setFlash } from './flash'

export const indexMailers = () => {
  return (dispatch) => {
    axios.get(`/api/mailers`)
    .then( resp => {
      dispatch({
        type: 'INDEX_MAILERS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Mailers not Found!','error')
      )
    })
  }
}

export const showMailer = ( mailerId ) => {
  return (dispatch) => {
    axios.get(`/api/mailers/${mailerId}`)
    .then( resp => {
      dispatch({
        type: 'SHOW_MAILER',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Mailer not Shown!','error')
      )
    })
  }
}

export const createMailer = ( mailer ) => {
  return (dispatch) => {
    axios.post(`/api/mailers`, { mailer })
    .then( resp => {
      dispatch({
        type: 'CREATE_MAILER',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Mailer not Created!','error')
      )
    })
  }
}

export const updateMailer = ( mailer ) => {
  delete mailer.created_at
  delete mailer.updated_at
  return (dispatch) => {
    axios.patch(`/api/mailers/${mailer.id}`, { mailer })
    .then( resp => {
      dispatch({
        type: 'UPDATE_MAILER',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Mailer not Updated!','error')
      )
    })
  }
}

export const deleteMailer = ( mailerId ) => {
  return (dispatch) => {
    axios.delete(`/api/mailers/${mailerId}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_MAILER',
        data: mailerId,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch(
        setFlash('Mailer not Deleted!','error')
      )
    })
  }
}

export const clearMailer = () => {
  return {
    type: 'CLEAR_MAILER',
  }
}
