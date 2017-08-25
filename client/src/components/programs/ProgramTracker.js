import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Table, Button } from 'semantic-ui-react'
import styled from 'styled-components'

// Custom components
import ProgramForm from './ProgramForm'
import Paginator from '../Paginator'
import RequirementsTracker from './RequirementsTracker'

// Custom Actions
import { indexPrograms } from '../../actions/programs'
import { indexRequirements } from '../../actions/requirements'


// Custom Components
const Spacer = styled.div`
  display: inline-block;
  width: 3rem !important;
`

class ProgramTracker extends Component {
  state = { hasMore: false, activeProgam: '', programId: '' }

  componentDidMount = () => {
    const { programs, dispatch } = this.props
    if( programs.data.length <= 0 ) {
      dispatch(indexPrograms())
      this.setState({ hasMore: true })
    }
  }

  componentWillReceiveProps = ( nextProps ) => {
    this.setState({
      ...nextProps
    })
  }

  handleRowClick = ( programId ) => {
    const { programs } = this.props
    if( programId && programs ) {
      this.setState({
        programId: programId,
        activeProgram: programs.data.find( prog => prog.id === programId )
      })
    }
  }

  displayPrograms = () => {
    let { programs: { data } } = this.props
    if( data && data.length > 0 ) {
      return data.map( prog => {
        return (
          <Table.Row
            key={prog.id}
            onClick={() => this.handleRowClick(prog.id)}>
            <Table.Cell textAlign='center'>{prog.id}</Table.Cell>
            <Table.Cell>{prog.title}</Table.Cell>
            <Table.Cell>{prog.description}</Table.Cell>
            <Table.Cell textAlign='center'>{prog.level}</Table.Cell>
            <Table.Cell textAlign='center'>{prog.num_req}</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  activeProgramDetails = () => {

  }

  closeActiveForm = () => {
    this.setState({ activeProgram: '', programId: '' })
  }

  loadMore = ( page ) => {
    const { hasMore } = this.state
    const { dispatch, programs: {pagination} } = this.props
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexPrograms(page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  handleEditRequirements = () => {
    const { programId } = this.state
    this.props.dispatch(indexRequirements())
    this.setState({ activeProgram: '' })
  }
  handleDeleteRequirements = () => {}
  handleCreateRequirement = () => {}

  render() {
    const { activeProgram } = this.state
    const { program: { requirements }} = this.props
    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rec.&nbsp;No.</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell>No.&nbsp;Req.</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.displayPrograms() }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={5} textAlign='right'>
                <Paginator
                  size='mini'
                  loadMore={this.loadMore}
                  pagination={this.props.programs.pagination} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
          { activeProgram &&
            <Segment>
              <ProgramForm
                formDataObject={activeProgram}
                closeActiveForm={this.closeActiveForm} />
              <Segment basic clearing>
                <label>
                  Program has&nbsp;{activeProgram.num_req}&nbsp;requirements.
                  Modify them by:
                </label>
                <Spacer />
                <Button.Group size='mini'>
                  <Button onClick={this.handleEditRequirements}>
                    Editing
                  </Button>
                  <Button.Or />
                  <Button onClick={this.handleDeleteRequirements}>
                    Deleting
                  </Button>
                  <Button.Or />
                  <Button onClick={this.handleCreateRequirement}>
                    Newly Creating
                  </Button>
                </Button.Group>
                <Spacer />
              </Segment>
            </Segment>
          }
          { requirements &&
            <RequirementsTracker requirements={requirements} />
          }
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    programs: state.programs,
  }
}

export default connect(mapStateToProps)(ProgramTracker)
