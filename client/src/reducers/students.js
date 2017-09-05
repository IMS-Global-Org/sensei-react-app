/**
 * Default variables for instantiating or reseting redux state
 * @type {Object}
 * @property {Array<student_json_records>} data
 * @property {Object} pagination information for student records
 */
const defaults = {
  data: [],
  pagination: {},
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
        paginate: action.data.paginate,
      }
    default:
      return state
  }
}

export default students
