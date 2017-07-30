import axios from 'axios'

export const indexAnnouncements = ( page = 1, per = 5, callback = null ) => {
  const query = `page=${page}&per=${per}`
  return (dispatch) => {
    axios.get(`/api/announcements?${query}`)
    .then( resp => {
      dispatch({
        type: 'INDEX_ANNOUNCEMENTS',
        data: resp.data,
        headers: resp.headers,
      })
    })
    .catch( resp => {
      dispatch('No New Announcements Loaded!','error')
    })
  }
}
