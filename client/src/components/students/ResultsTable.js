import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Table, Button } from 'semantic-ui-react'
import SearchBar from './SearchBar'
import moment from 'moment'
import Paginator from '../Paginator'
import StudentRecord from './StudentRecord'
import styled from 'styled-components'

// Actions
import {
  indexStudents,
  queryStudents,
  pdfStudents,
  csvStudents,
} from '../../actions/students'

// Custom Components
const ButtonGroupText = styled.div`
  display: inline-block;
  padding: 0 1rem 0 2rem;
`

class ResultsTable extends Component {
  state = { hasMore: false, query: '', studentId: '' }

  componentDidMount = () => {
    const { dispatch, students } = this.props
    if( !students || students.length <= 0 ) {
      dispatch(indexStudents('',''))
      this.setState({ hasMore: true })
    }
  }

  setQuery = ( query, studentId = '' ) => {
    this.setState({ query, studentId })
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
  handleNewStudent = () => this.setState({ studentId: -1 })

  handleCreatePdf = () => {
    const { query } = this.state
    const { dispatch } = this.props
    dispatch(pdfStudents(query))
  }

  handleCreateCSV = () => {
    const { query } = this.state
    const { dispatch } = this.props
    dispatch(csvStudents(query))
  }

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
                <SearchBar
                  setQuery={this.setQuery}
                  handleCancelForm={this.handleCancelForm} />
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
                <Button
                  size='mini'
                  type='button'
                  onClick={this.handleNewStudent}>
                  New Student
                </Button>
                <ButtonGroupText>Save Results as:</ButtonGroupText>
                <Button.Group size='mini'>
                  <Button
                    type='button'
                    onClick={this.handleCreateCSV}>
                    CVS
                  </Button>
                  <Button.Or />
                  <Button
                    type='button'
                    onClick={this.handleCreatePdf}>
                    Pdf
                  </Button>
                </Button.Group>
                <Paginator
                  loadMore={this.loadMore}
                  pagination={this.props.pagination}
                  size='mini' />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
          { Number.isInteger(studentId) &&
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
