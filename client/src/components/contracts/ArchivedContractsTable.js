import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Table, Header, Icon, Button } from 'semantic-ui-react'
import Paginator from '../Paginator'
import moment from 'moment'

// Actions
import {
  indexArchived,
} from '../../actions/contracts'

class ArchivedContractsTable extends Component {
  state = { hasMore: false }
  dateFormat = 'ddd, MMM Do YYYY'

  componentDidMount = () => {
    const { dispatch, archived } = this.props
    if( !archived || archived.length <= 0 ) {
      dispatch(indexArchived())
      this.setState({ hasMore: true })
    }
  }

  displayTableBody = () => {
    const { archived } = this.props
    if( archived && archived.length > 0 ) {
      return archived.map( archive => {
        return (
          <Table.Row
            key={archive.id}>
            <Table.Cell>
              {moment(archive.start_date).format(this.dateFormat)}
            </Table.Cell>
            <Table.Cell>
              {moment(archive.end_date).format(this.dateFormat)}
            </Table.Cell>
            <Table.Cell>${archive.amount}</Table.Cell>
            <Table.Cell>{archive.interval}</Table.Cell>
            <Table.Cell>{archive.status ? 'Active' : 'Inactive' }</Table.Cell>
            <Table.Cell textAlign='center' verticalAlign='center'>
              <Button.Group size='mini'>
                <Button
                  type='button'
                  onClick={()=>this.displayArchiveInfo(archive.id)} >
                  View
                </Button>
                <Button.Or />
                <Button
                  type='button'
                  onClick={()=>this.editarchiveDetails(archive.id)} >
                  Edit
                </Button>
                <Button.Or />
                <Button
                  type='button'
                  onClick={()=>this.archivearchiveInfo(archive.id)} >
                  Archive
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  render = () => {
    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Header as='h1' icon textAlign='center'>
                  <Icon name='law' />
                  <Header.Content>
                    Archived Contracts
                  </Header.Content>
                </Header>
                <p style={{ textAlign: 'justify', margin: '1rem 4rem' }}>
                  You will find listed in the table below the student contracts
                  that are considered Archived. Use the search button to
                  locate specific contracts.
                </p>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Start</Table.HeaderCell>
              <Table.HeaderCell>End</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Interval</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.displayTableBody() }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Paginator
                  loadMore={this.loadMore}
                  pagination={this.props.pagination} />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Button.Group size='tiny'>
                  <Button
                    onClick={this.showSearchModal}>
                    Search Filter
                  </Button>
                </Button.Group>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    archived: state.contracts.archived
  }
}

export default connect(mapStateToProps)(ArchivedContractsTable)
