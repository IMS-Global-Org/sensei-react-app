import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment } from 'semantic-ui-react'
import ResultsTable from './ResultsTable'
import {
  indexStudents,
} from '../../actions/students'

class Students extends Component {

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
