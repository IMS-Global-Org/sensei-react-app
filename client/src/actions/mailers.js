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
