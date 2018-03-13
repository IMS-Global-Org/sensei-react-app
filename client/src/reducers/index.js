import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import announcements from './announcements'
import postings from './homePage'
import tablePostings from './postings'
import calendar from './calendar/calendar'
import programs from './programs'
import requirements from './requirements'
import students from './students'
import mailers from './mailers'
import contracts from './contracts'
import contractees from './contractees'
import contact_emails from './contact_emails'

// Form Validation and Error Messaging reducer
import { reducer as formReducer } from 'redux-form'


const rootReducer = combineReducers({
  form: formReducer, // Just for Form Validation and Error Messaging
  contact_emails,
  contractees,
  contracts,
  mailers,
  students,
  requirements,
  programs,
  calendar,
  tablePostings,
  postings,
  announcements,
  user,
  flash,
})

export default rootReducer
