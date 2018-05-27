import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import ClientAccessForm from './ClientAccessForm'
import Paginator from '../Paginator'
import ClientSearchForm from './ClientSearchForm'

// Actions
import {
  indexClientList,
} from '../../actions/access'

class ClientList extends Component {
  defaults = { clientList: '', hasMore: false }
  state = { ...this.defaults }

  componentDidMount = () => {
    const { clientList: remote, dispatch } = this.props
    const { clientList: local } = this.state
    if( !local && remote.length <= 0 ) {
      dispatch(indexClientList())
      this.setState({ hasMore: true })
    } else if( remote.length > 0 ) {
      this.setState({ clientList: remote, hasMore: true })
    }
  }

  renderTableHeader = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan={3}>
          <ClientSearchForm />
        </Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>
          Client's Name
        </Table.HeaderCell>
        <Table.HeaderCell>
          E-mail
        </Table.HeaderCell>
        <Table.HeaderCell>
          Access Level
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )

  renderTableFooter = () => (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan={3}>
          { this.props.pagination.total_pages &&
            <Paginator
              pagination={this.props.pagination}
              loadMore={this.loadMore} />
          }
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )

  renderTableBodies = () => {
    const { clientList } = this.props
    if( clientList && clientList.length > 0 ) {
      return clientList.map( client => (
        <Table.Body key={client.id}>
          <Table.Row>
            <Table.Cell>{ client.name }</Table.Cell>
            <Table.Cell>{ client.email }</Table.Cell>
            <Table.Cell>
              <ClientAccessForm client={client} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      ))
    }
  }

  loadMore = ( page ) => {
    const { pagination, dispatch } = this.props
    const { hasMore } = this.state
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexClientList(page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  render = () => {
    return (
      <Table celled >
        { this.renderTableHeader() }
        { this.renderTableBodies() }
        { this.renderTableFooter() }
      </Table>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    clientList: state.clientList.clients,
    pagination: state.clientList.pagination,
  }
}

export default connect(mapStateToProps)(ClientList)
