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


const rootReducer = combineReducers({
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
