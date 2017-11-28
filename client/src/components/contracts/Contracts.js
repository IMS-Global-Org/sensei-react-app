import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, Table,
  Header, Icon, Button } from 'semantic-ui-react'
import Paginator from '../Paginator'
import ContractSearchModal from './ContractSearchModal'
import moment from 'moment'
import _ from 'lodash'
import ShowContractInfoModal from './ShowContractInfoModal'
import EditContractDetailsModal from './EditContractInfoModal'
import ArchiveContractInfoModal from './ArchiveContractInfoModal'
import ArchivedContractsTableModal from './ArchivedContractsTableModal'

// Actions
import {
  indexContracts,
  queryContracts,
} from '../../actions/contracts'

class Contracts extends Component {
  defaults = {
    showSearchModal: false, query: {},
    showContractInfo: false,
    editContractDetails: false,
    archiveContractInfo: false,
    showArchivedContracts: false,
    contractId: ''
  }
  state = { hasMore: false, ...this.defaults }
  dateFormat = 'ddd, MMM Do YYYY'

  componentDidMount = () => {
    const { dispatch, contracts } = this.props
    if( !contracts || contracts.length <= 0 ) {
      dispatch(indexContracts())
      this.setState({ hasMore: true })
    }
  }

  displayTableBody = () => {
    const { contracts } = this.props
    if( contracts && contracts.length > 0 ) {
      return contracts.map( contract => {
        return (
          <Table.Row
            key={contract.id}>
            <Table.Cell>
              {moment(contract.start_date).format(this.dateFormat)}
            </Table.Cell>
            <Table.Cell>
              {moment(contract.end_date).format(this.dateFormat)}
            </Table.Cell>
            <Table.Cell>${contract.amount}</Table.Cell>
            <Table.Cell>{contract.interval}</Table.Cell>
            <Table.Cell>{contract.status ? 'Active' : 'Inactive' }</Table.Cell>
            <Table.Cell textAlign='center' verticalAlign='middle'>
              <Button.Group size='mini'>
                <Button
                  type='button'
                  onClick={()=>this.displayContractInfo(contract.id)} >
                  View
                </Button>
                <Button.Or />
                <Button
                  type='button'
                  onClick={()=>this.editContractDetails(contract.id)} >
                  Edit
                </Button>
                <Button.Or />
                <Button
                  type='button'
                  onClick={()=>this.archiveContractInfo(contract.id)} >
                  Archive
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  displayContractInfo = ( contractId ) => {
    this.setState({
      ...this.defaults,
      showContractInfo: true,
      contractId: contractId
    })
  }
  editContractDetails = ( contractId ) => {
    this.setState({
      ...this.defaults,
      editContractDetails: true,
      contractId: contractId
    })
  }
  archiveContractInfo = ( contractId ) => {
    this.setState({
      ...this.defaults,
      archiveContractInfo: true,
      contractId: contractId
    })
  }
  showArchivedContracts = () => {
    const { showArchivedContracts } = this.state
    this.setState({
      ...this.defaults,
      showArchivedContracts: !showArchivedContracts,
    })
  }
  newContractForm = () => this.setState({
    ...this.defaults,
    editContractDetails: true,
    contractId: ''
  })
  closeModals = () => this.setState({ ...this.defaults })

  loadMore = ( page ) => {
    const { pagination, dispatch } = this.props
    const { hasMore, query } = this.state
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        _.isEmpty(query) ?
          dispatch(indexContracts(page)) : dispatch(queryContracts(query,page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  showSearchModal = () => this.setState({ showSearchModal: true })

  queryContracts = ( query ) => {
    const { dispatch } = this.props
    dispatch(queryContracts(query))
    this.setState({ query: query, showSearchModal: false })
  }

  render() {
    const {
      showSearchModal,
      showContractInfo,
      editContractDetails,
      archiveContractInfo,
      showArchivedContracts,
      contractId,
    } = this.state

    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Header as='h1' icon textAlign='center'>
                  <Icon name='law' />
                  <Header.Content>
                    Student Contracts
                  </Header.Content>
                </Header>
                <p style={{ textAlign: 'justify', margin: '1rem 4rem' }}>
                  You will find listed in the table below the student contracts
                  that are still considered active. Use the search button to
                  locate specific contracts or find older expired contracts. If any
                  question arise while using working with the contracts, contact the
                  &nbsp;<a href='mailto:sensei_ou_unit@blkdojos.com'>Sensei</a>&nbsp;
                  as soon as possible. Thanks!
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
                  <Button.Or />
                  <Button
                    type='button'
                    color='green'
                    onClick={this.newContractForm}>
                    New Contract
                  </Button>
                  <Button.Or />
                  <Button
                    type='button'
                    color='blue'
                    onClick={this.showArchivedContracts}>
                    View Archived
                  </Button>
                </Button.Group>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        { showSearchModal &&
          <ContractSearchModal queryContracts={this.queryContracts} />
        }
        { showContractInfo &&
          <ShowContractInfoModal
            contractId={contractId}
            closeModals={this.closeModals} />
        }
        { editContractDetails &&
          <EditContractDetailsModal
            contractId={contractId}
            closeModals={this.closeModals} />
        }
        { archiveContractInfo &&
          <ArchiveContractInfoModal
            contractId={contractId}
            closeModals={this.closeModals} />
        }
        { showArchivedContracts &&
          <ArchivedContractsTableModal
            closeModals={this.closeModals} />
        }
      </Container>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contracts: state.contracts.data,
    pagination: state.contracts.pagination,
  }
}

export default connect(mapStateToProps)(Contracts)
