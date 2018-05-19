import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import ClientAccessForm from './ClientAccessForm'

// Actions
import {
  indexClientList,
} from '../../actions/access'

class ClientList extends Component {
  defaults = { clientList: '' }
  state = { ...this.defaults }

  componentDidMount = () => {
    const { clientList: remote, dispatch } = this.props
    const { clientList: local } = this.state
    if( !local && remote.length <= 0 ) {
      dispatch(indexClientList())
    } else if( remote.length > 0 ) {
      this.setState({ clientList: remote })
    }
  }

  renderTableHeader = () => (
    <Table.Header>
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
          Paginator
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
  }
}

export default connect(mapStateToProps)(ClientList)
