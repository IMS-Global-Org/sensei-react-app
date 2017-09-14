const defaults = {
  data: [],
  mailer: {},
}

const mailers = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'INDEX_MAILERS':
      return {
        data: action.data
      }
    default:
      return state
  }
}

export default mailers
