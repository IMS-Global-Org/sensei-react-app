import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment } from 'semantic-ui-react'
import SearchBar from './SearchBar'
import {
  indexStudents,
} from '../../actions/students'

class Students extends Component {
  state = { hasMore: false, level: 1, belt: 'green' }

  componentDidMount = () => {
    const { dispatch, students } = this.props
    if( !students || students.length <= 0 ) {
      dispatch(indexStudents('1', 'green'))
    }
  }

  render() {
    return (
      <Container>
        <Segment>
          <SearchBar />
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    students: state.data,
  }
}

export default connect(mapStateToProps)(Students)
