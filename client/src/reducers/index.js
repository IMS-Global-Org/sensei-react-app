import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import announcements from './announcements'

const rootReducer = combineReducers({
  announcements,
  user,
  flash,
})

export default rootReducer
