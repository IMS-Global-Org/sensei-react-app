import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, Segment, Table,
  Button, Header, Icon
} from 'semantic-ui-react'
import styled from 'styled-components'

// Custom components
import ProgramForm from './ProgramForm'
import Paginator from '../Paginator'
import RequirementsTracker from './RequirementsTracker'

// Custom Actions
import { indexPrograms } from '../../actions/programs'
import {
  indexRequirements,
  clearRequirements,
} from '../../actions/requirements'


// Custom Components
const Spacer = styled.div`
  display: inline-block;
  width: 3rem !important;
`

class ProgramTracker extends Component {
  state = { hasMore: false, activeProgram: '', programId: '' }

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
    const { programs, dispatch } = this.props
    if( programId && programs ) {
      dispatch(clearRequirements())
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

  showActiveProgram = () => {
    this.handleRowClick( this.state.programId )
  }

  updatePrograms = () => {
    const { dispatch } = this.props
    dispatch(indexPrograms())
  }

  //=============================================
  // Methods for handling the requirements for a
  // particular program.
  //=============================================

  handleEditRequirements = () => {
    const { programId } = this.state
    this.props.dispatch(indexRequirements(programId))
    this.setState({ activeProgram: '' })
  }
  handleDeleteRequirements = () => {}
  handleCreateRequirement = () => {}

  render() {
    const { activeProgram } = this.state
    const { requirements } = this.props
    return (
      <Container>
        <Segment>
          <Header as='h1' icon textAlign='center'>
            <Icon name='info circle' />
            Information
            <Header.Subheader style={{ textAlign: 'justify', margin: '2rem 3rem' }}>
              Welcome to the program tracker module.
              Programs can be either created or modified, depending on
              whether or not the program already exists. If a new program needs to
              be created, please click on the corresponding 'New Program' button.
              If an existing program needs to be updated or deleted, click on it's
              corresponding table row and the programs's information will be
              automatically loaded into the form below it. Once the programs's
              information has been updated, click the 'Update' button to save
              the program back to the database. All programs can be view in realtime.
              Please contact the&nbsp;
              <a href='mailto:sensei_ou_unit@blkdojos.com'>Sensei</a>
              &nbsp; with any questions regarding the creation or maintenance of
              the programs.
            </Header.Subheader>
          </Header>
        </Segment>
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
                </label>
                <Spacer />
                <Button.Group size='mini'>
                  <Button onClick={this.handleEditRequirements}>
                    Modify Requirements
                  </Button>
                </Button.Group>
                <Spacer />
              </Segment>
            </Segment>
          }
          { ( requirements && requirements.pagination.total_pages > 0 ) &&
            <RequirementsTracker
              requirements={requirements}
              showActiveProgram={this.showActiveProgram}
              programId={this.state.programId}
              updatePrograms={this.updatePrograms} />
          }
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    programs: state.programs,
    requirements: state.requirements,
  }
}

export default connect(mapStateToProps)(ProgramTracker)
