import axios from 'axios'
import { setFlash } from './flash'

export const createContactUs = ( contactus, cb = '' ) => {
  return dispatch => {
    axios.post(`/api/contactus`, { contactus } )
    .then( resp => {
      dispatch({
        type: 'CREATE_CONTACT_US',
        data: resp.data,
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
