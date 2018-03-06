const defaults = {
  data: '',
}

const contactus = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'CREATE_CONTACT_US':
      return {
        data: action.data
      }
    default:
      return state
  }
}

export default contactus
