const defaults = {
  clients: [],
  pagination: {
    total_pages: '',
    current_page: '',
    next_page: '',
  }
}

const clientList = ( state = defaults, action ) => {
  let index = ''
  switch( action.type ) {
    case 'INDEX_CLIENT_LIST':
      return {
        ...state,
        clients: action.clients.data,
        pagination: action.clients.pagination,
      }
    case 'UPDATE_CLIENT_LIST':
      index = state.clients.findIndex( client =>
        client.id === action.client.id
      )
      return {
        ...state,
        clients: [
          ...state.clients.slice(0,index),
          action.client,
          ...state.clients.slice(index+1),
        ],
      }
    case 'QUERY_CLIENT_LIST':
      return {
        ...state,
        clients: action.clients,
        pagination: { ...defaults.pagination },
      }
    default:
      return state
  }
}

export default clientList
