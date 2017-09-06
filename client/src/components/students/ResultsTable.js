import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Table } from 'semantic-ui-react'
import SearchBar from './SearchBar'
import moment from 'moment'
import Paginator from '../Paginator'
import StudentRecord from './StudentRecord'

// Actions
import {
  indexStudents,
  queryStudents,
} from '../../actions/students'

class ResultsTable extends Component {
  state = { hasMore: false, query: '', studentId: '' }

  componentDidMount = () => {
    const { dispatch, students } = this.props
    if( !students || students.length <= 0 ) {
      dispatch(indexStudents('',''))
      this.setState({ hasMore: true })
    }
  }

  setQuery = ( query ) => {
    this.setState({ query })
  }

  loadMore = ( page ) => {
    const { pagination, dispatch } = this.props
    const { hasMore, query } = this.state
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        if( query ){
          dispatch(queryStudents(query,page))
        } else {
          dispatch(indexStudents('','',page))
        }
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  handleRowClick = ( studentId ) => this.setState({ studentId })
  handleCancelForm = () => this.setState({ studentId: '' })

  displayTableRows = () => {
    const { students } = this.props
    if( students && students.length > 0 ) {
      return students.map( student => {
        const age = moment().years() - moment(student.birthday).years()
        return (
          <Table.Row
            key={student.id}
            onClick={()=>this.handleRowClick(student.id)}>
            <Table.Cell>{student.first}</Table.Cell>
            <Table.Cell>{student.last}</Table.Cell>
            <Table.Cell>{age}</Table.Cell>
            <Table.Cell>{student.gender}</Table.Cell>
            <Table.Cell>{student.belt}</Table.Cell>
            <Table.Cell>{student.level}</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  render() {
    const { studentId } = this.state
    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <SearchBar setQuery={this.setQuery} />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Header as='h3' textAlign='center'>Student Listing</Header>
                <p style={{ textAlign: 'center' }}>
                  Listing of current and previously enrolled students. Please
                  use the query fields above to filter the visible list of
                  students if needed.
                </p>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>First</Table.HeaderCell>
              <Table.HeaderCell>Last</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Belt</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.displayTableRows() }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Paginator
                  loadMore={this.loadMore}
                  pagination={this.props.pagination}
                  size='mini' />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
          { studentId &&
            <Segment>
              <Header as='h3' textAlign='center'>Student Record</Header>
              <p style={{ textAlign: 'center' }}>
                Please edit or complete the form below to create accurate student
                records in the database. All records can be changed at a later time.
              </p>
              <StudentRecord
                handleCancelForm={this.handleCancelForm}
                studentId={studentId} />
            </Segment>
          }
      </div>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    students: state.students.data,
    pagination: state.students.pagination,
  }
}

export default connect(mapStateToProps)(ResultsTable)
