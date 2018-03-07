import axios from 'axios'
import { setFlash } from './flash'

export const createContactUs = ( contactUs, cb = '' ) => {
  return dispatch => {
    axios.post(`/api/contact_us`, { contact_us: contactUs } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTACT_US',
        email: resp.data,
        headers: resp.headers,
      })
      if( cb ) { cb() }
    })
    .catch( resp => {
      dispatch(
        setFlash('Contact Us Email Not Sent!','error')
      )
    })
  }
}
