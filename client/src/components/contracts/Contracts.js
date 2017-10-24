import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, Segment, Table,
  Header, Icon, Button } from 'semantic-ui-react'
import Paginator from '../Paginator'
import ContractSearchModal from './ContractSearchModal'

// Actions
import {
  indexContracts,
  queryContracts,
} from '../../actions/contracts'

class Contracts extends Component {
  state = { hasMore: false, showSearchModal: false, query: {} }

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
          <Table.Row key={contract.id}>
            <Table.Cell>{contract.start_date}</Table.Cell>
            <Table.Cell>{contract.end_date}</Table.Cell>
            <Table.Cell>{contract.amount}</Table.Cell>
            <Table.Cell>{contract.interval}</Table.Cell>
            <Table.Cell>{contract.status ? 'Active' : 'InActive' }</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  loadMore = ( page ) => {
    const { pagination, dispatch } = this.props
    const { hasMore, query } = this.state
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        query ?
          dispatch(queryContracts(query,page)) : dispatch(indexContracts(page))
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
    const { showSearchModal } = this.state
    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={5}>
                <Header as='h1' icon circular textAlign='center'>
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.displayTableBody() }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={5}>
                <Paginator
                  loadMore={this.loadMore}
                  pagination={this.props.pagination} />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan={5}>
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
        { showSearchModal &&
          <ContractSearchModal queryContracts={this.queryContracts} />
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
