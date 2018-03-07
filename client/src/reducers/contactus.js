const defaults = {
  emails: '',
  email: '',
}

const contactus = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'CREATE_CONTACT_US':
      return {
        email: action.email,
      }
    default:
      return state
  }
}

export default contactus
