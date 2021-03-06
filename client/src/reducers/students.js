/**
 * Default variables for instantiating or reseting redux state
 * @type {Object}
 * @property {Array<student_json_records>} data
 * @property {Object} pagination information for student records
 * @property {Object} student information for a single student
 */
const defaults = {
  data: [],
  pagination: {
    total_pages: '',
    current_page: '',
    next_page: '',
  },
  student: {}
}

const students = ( state = defaults, action ) => {
  switch( action.type ) {
    case 'INDEX_STUDENTS':
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination,
      }
    case 'QUERY_STUDENTS':
      return {
        ...state,
        data: action.data.data,
        pagination: action.data.pagination,
      }
    case 'SHOW_STUDENT':
      return {
        ...state,
        student: action.data
      }
    case 'CLEAR_STUDENT':
      return {
        ...state,
        student: defaults.student,
      }
    case 'UPDATE_STUDENT':
      const index = state.data.findIndex( student => {
        return parseInt(student.id,10) === parseInt(action.data.id,10)
      })
      return {
        ...state,
        data: [
          ...state.data.slice(0,index),
          action.data,
          ...state.data.slice(index + 1),
        ],
        student: action.data
      }
    case 'CREATE_STUDENT':
      return {
        ...state,
        data: [
          action.data,
          ...state.data,
        ],
        student: action.data
      }
    case 'DELETE_STUDENT':
      return {
        ...state,
        data: state.data.filter( student => student.id !== action.data.id ),
        student: defaults.student,
      }
    case 'INACTIVATE_STUDENT':
      return {
        ...state,
        data: state.data.filter( student => student.id !== action.data.id ),
        student: defaults.student,
      }
    case 'CLEAR_STUDENTS':
      return { ...defaults }
    default:
      return state
  }
}

export default students
