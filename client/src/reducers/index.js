import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import announcements from './announcements'
import postings from './homePage'
import tablePostings from './postings'
import calendar from './calendar/calendar'
import programs from './programs'
import requirements from './requirements'

const rootReducer = combineReducers({
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
