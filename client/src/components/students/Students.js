import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment } from 'semantic-ui-react'
import ResultsTable from './ResultsTable'
import {
  indexStudents,
} from '../../actions/students'

class Students extends Component {

  componentDidMount = () => this.loadStudents(this.props)
  componentWillRecieveProps = (props) => this.loadStudents(props)
  loadStudents = ( props ) => {
    const { students, dispatch } = props
    if( students.length <= 0 ) {
      dispatch(indexStudents())
    }
  }

  render() {
    return (
      <Container>
        <Segment>
          <ResultsTable />
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    students: state.students.data,
  }
}

export default connect(mapStateToProps)(Students)
