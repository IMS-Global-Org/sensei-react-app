import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Table, Header, Icon, Button, Checkbox } from 'semantic-ui-react'
import Paginator from '../Paginator'
import moment from 'moment'
import ContractSearchModal from './ContractSearchModal'

// Actions
import {
  indexArchivedContracts,
  resetArchivedContracts,
  queryArchivedContracts,
} from '../../actions/contracts'

class ArchivedContractsTable extends Component {
  state = {
    hasMore: false, allChecked: false, query: '',
    checkedItems: '', showSearchModal: false
  }
  dateFormat = 'ddd, MMM Do YYYY'

  componentDidMount = () => {
    const { dispatch, archived } = this.props
    if( !archived || archived.length <= 0 ) {
      dispatch(indexArchivedContracts())
      this.setState({ hasMore: true })
    }
  }
  componentWillUnmount = () => this.props.dispatch(resetArchivedContracts())

  displayTableBody = () => {
    const { archived } = this.props
    const { checkedItems } = this.state
    if( archived && archived.length > 0 ) {
      return archived.map( archive => {
        return (
          <Table.Row
            key={archive.id}>
            <Table.Cell textAlign='center'>
              <Checkbox
                onChange={()=>this.handleAddCheckedItem(archive.id)}
                checked={checkedItems.includes(archive.id)} />
            </Table.Cell>
            <Table.Cell>
              {moment(archive.start_date).format(this.dateFormat)}
            </Table.Cell>
            <Table.Cell>
              {moment(archive.end_date).format(this.dateFormat)}
            </Table.Cell>
            <Table.Cell>${archive.amount}</Table.Cell>
            <Table.Cell>{archive.interval}</Table.Cell>
            <Table.Cell>{archive.status ? 'Active' : 'Inactive' }</Table.Cell>
            <Table.Cell textAlign='center' verticalAlign='middle'>
              <Button.Group size='mini'>
                <Button
                  type='button'
                  onClick={()=>this.displayArchiveInfo(archive.id)} >
                  View
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  loadMore = ( page ) => {
    const { dispatch, pagination } = this.props
    const { hasMore, query } = this.state
    let archivedContractsFunc = ''
    if( query === '') {
      archivedContractsFunc = indexArchivedContracts
    } else {
      archivedContractsFunc = queryArchivedContracts
    }
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(archivedContractsFunc(query, page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  handleAllChecked = () => {
    const { archived } = this.props
    const { allChecked } = this.state
    if( allChecked ) {
      this.setState({
        checkedItems: '',
        allChecked: !allChecked,
      })
    } else {
      this.setState({
        checkedItems: archived.map( a => a.id ),
        allChecked: true,
      })
    }
  }

  handleAddCheckedItem = ( itemId ) => {
    const { checkedItems } = this.state
    if( checkedItems.includes(itemId) ){
      this.setState({ checkedItems: checkedItems.filter( ci => ci !== itemId )})
    } else {
      this.setState({ checkedItems: [ itemId, ...checkedItems ] })
    }
  }

  showSearchModal = () => {
    const { showSearchModal } = this.state
    this.setState({ showSearchModal: !showSearchModal })
  }

  queryContracts = ( query ) => {
    const { dispatch } = this.props
    dispatch(queryArchivedContracts(query))
    this.setState({ query: query, showSearchModal: false })
  }


  render = () => {
    const { allChecked, showSearchModal } = this.state
    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={7}>
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
              <Table.HeaderCell textAlign='center'>
                <Checkbox
                  onChange={this.handleAllChecked}
                  checked={allChecked} />
              </Table.HeaderCell>
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
              <Table.HeaderCell colSpan={7}>
                <Paginator
                  loadMore={this.loadMore}
                  pagination={this.props.pagination} />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan={7}>
                <Button.Group size='tiny'>
                  <Button
                    type='button'
                    onClick={this.showSearchModal}>
                    Search Filter
                  </Button>
                  <Button.Or />
                  <Button
                    type='button'
                    onClick={this.printCheckedItems}>
                    Print Selected
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
    archived: state.contracts.archived.data,
    pagination: state.contracts.archived.pagination,
  }
}

export default connect(mapStateToProps)(ArchivedContractsTable)
