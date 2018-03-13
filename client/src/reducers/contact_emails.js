const defaults = {
  emails: '',
  email: '',
  pagination: {
    total_pages: '',
    current_page: '',
    next_page: '',
  }
}

const contact_emails = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'CREATE_CONTACT_EMAIL':
      return {
        ...state,
        email: action.email,
      }
    case 'INDEX_CONTACT_EMAILS':
      return {
        ...state,
        emails: action.emails,
        pagination: action.pagination,
      }
    case 'UPDATE_CONTACT_EMAIL':
      const emailIndex = state.emails.findIndex( email =>
        parseInt(email.id,10) === parseInt(action.email.id,10)
      )
      return {
        ...state,
        emails: [
          ...state.emails.slice(0,emailIndex),
          action.email,
          ...state.emails.slice(emailIndex + 1),
        ],
      }
    default:
      return state
  }
}

export default contact_emails
