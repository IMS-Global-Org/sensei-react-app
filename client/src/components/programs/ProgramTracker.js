import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Table, Button } from 'semantic-ui-react'

// Custom components
import ProgramForm from './ProgramForm'

// Custom Actions
import { indexPrograms } from '../../actions/programs'

class ProgramTracker extends Component {
  state = { hasMore: false, activeProgam: false }

  componentDidMount = () => {
    const { programs, dispatch } = this.props
    if( programs.data.length <= 0 ) {
      dispatch(indexPrograms())
    }
  }

  componentWillReceiveProps = ( nextProps ) => {
    this.setState({
      ...nextProps
    })
  }

  handleRowClick = ( programId ) => {
    // Show Form with information
    this.setState({ activeProgram: programId })
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
    const { activeProgram } = this.state
    const { programs } = this.props
    if( activeProgram && programs ) {
      return programs.data.find( prog => prog.id === activeProgram )
    }
  }

  closeActiveForm = () => {
    this.setState({ activeProgram: false })
  }

  render() {
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
                <Button.Group size='tiny'>
                  <Button>Click Me!</Button>
                </Button.Group>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
          { this.state.activeProgram &&
            <ProgramForm
              formDataObject={this.activeProgramDetails()}
              closeActiveForm={this.closeActiveForm} />
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
