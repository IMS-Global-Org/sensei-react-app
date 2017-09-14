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
    axios.get(`/api/mailer/${mailerId}`)
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
    axios.post(`/api/mailer`, { mailer })
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
  return (dispatch) => {
    axios.patch(`/api/mailer/${mailer.id}`, { mailer })
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
    axios.delete(`/api/mailer/${mailer.id}`)
    .then( resp => {
      dispatch({
        type: 'DELETE_MAILER',
        data: resp.data,
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
