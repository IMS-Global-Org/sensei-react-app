import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Table, Button } from 'semantic-ui-react'

// Custom Actions
import {
  indexRequirements,
  deleteRequirement,
} from '../../actions/requirements'

// Custom Components
import Paginator from '../Paginator'
import RequirementForm from './RequirementForm'

class RequirementsTracker extends Component {
  state = { hasMore: false, activeRequirement: '' }

  componentDidMount = () => {
    const { pagination: { total_pages } } = this.props.requirements
    this.updateHasMore( total_pages )
  }

  componentWillReceiveProps = ( nextProps ) => {
    this.updateHasMore( nextProps.requirements.pagination.total_pages )
  }

  updateHasMore = ( total_pages ) => {
    if( total_pages > 1 ) {
      this.setState({
        hasMore: true
      })
    }
  }

  displayTableHeader = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Level</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }

  displayTableBody = () => {
    const { requirements: { data } } = this.props
    if( data && data.length > 0 ) {
      return data.map( req => {
        return (
          <Table.Row
            key={req.id}
            onClick={() => this.handleRowClick(req.id) }>
            <Table.Cell>{req.level}</Table.Cell>
            <Table.Cell>{req.title}</Table.Cell>
            <Table.Cell>{req.description}</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  handleRowClick = ( requirementId ) => {
    const { requirements: { data } } = this.props
    this.setState({
      activeRequirement: data.find( req => req.id === requirementId )
    })
  }

  deleteRequirement = ( requirementId ) => {
    const { dispatch, programId } = this.props
    dispatch(deleteRequirement(requirementId))
    dispatch(indexRequirements(programId))
    this.setState({ hasMore: true })
    this.props.updatePrograms()
  }

  loadMore = ( page ) => {
    const { hasMore } = this.state
    const { requirements: { pagination }, dispatch, programId } = this.props
    if( hasMore && pagination ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexRequirements(programId, page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  render() {
    return (
      <Segment>
        <Segment basic>
          <Button.Group size='mini'>
            <Button onClick={this.props.showActiveProgram}>
              Back to Program
            </Button>
          </Button.Group>
        </Segment>
        <Table celled>
          { this.displayTableHeader() }
          <Table.Body>
            { this.displayTableBody() }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={3}>
                <Paginator
                  size='mini'
                  loadMore={this.loadMore}
                  pagination={this.props.requirements.pagination} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <RequirementForm
          requirement={this.state.activeRequirement}
          deleteRequirement={this.deleteRequirement}
          programId={this.props.programId} />
      </Segment>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    requirements: state.requirements,
  }
}

export default connect(mapStateToProps)(RequirementsTracker)
