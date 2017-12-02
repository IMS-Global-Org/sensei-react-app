import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Header, Icon } from 'semantic-ui-react'
import Paginator from '../Paginator'
import moment from 'moment'
import styled from 'styled-components'
import ContracteeModal from './ContracteeModal'

// Actions
import {
  paginateContractees,
  clearContractees,
} from '../../actions/contractees'

// Custom Styled Components
const P = styled.p`
  margin: 1rem 6rem;
  font-size: 1.25rem;
`

class ContracteesTable extends Component {
  defaults = { isLoaded: false, loadMore: false, modal: '', contracteeId: '' }
  state = { ...this.defaults }

  birthdateFormat = 'dddd, MMMM Do YYYY'

  componentDidMount = () => this.loadContractees(this.props)
  componentWillReceiveProps = ( props ) => this.loadContractees(props)
  componentWillUnmount = () => this.props.dispatch(clearContractees())
  loadContractees = ( props ) => {
    const { dispatch, contractees } = this.props
    const { isLoaded } = this.state
    if( !isLoaded ) {
      if( !contractees || contractees.length <= 0 ) {
        dispatch(paginateContractees())
        this.setState({ isLoaded: !isLoaded, loadMore: true })
      }
    }
  }

  showModal = ( modal, contracteeId ) => this.setState({ modal, contracteeId })
  closeModal = () => this.setState({ modal: '' })

  loadMore = ( page ) => {
    const { dispatch, pagination } = this.props
    const { loadMore } = this.state
    if( loadMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(paginateContractees(page))
      } else {
        this.setState({ loadMore: false })
      }
    }
  }

  displayTableRows = () => {
    const { contractees } = this.props
    if( contractees && contractees.length > 0 ) {
      return contractees.map( cte => {
        return (
          <Table.Row key={cte.id}>
            <Table.Cell>
              {`${cte.last}, ${cte.first}`}
            </Table.Cell>
            <Table.Cell>
              { moment(cte.birthdate).format(this.birthdateFormat)}
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Button.Group size='mini'>
                <Button
                  type='button'
                  onClick={()=>this.showModal('view',cte.id)}>
                  View
                </Button>
                <Button.Or />
                <Button
                  type='button'
                  onClick={()=>this.showModal('edit',cte.id)}>
                  Edit
                </Button>
                <Button.Or />
                <Button
                  type='button'
                  onClick={()=>this.showModal('archive',cte.id)}>
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
    const { modal, contracteeId } = this.state
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={3}>
              <Header as='h1' icon textAlign='center'>
                <Icon name='legal' />
                <Header.Content>
                  Current Contractees
                </Header.Content>
              </Header>
              <P>
                The table below displays a list of current contractees. Each
                contractee's records can be modified by selecting the individual
                functions listed to the right of their record rows. If any
                question arise while using working with the contracts, contact the
                &nbsp;<a href='mailto:sensei_ou_unit@blkdojos.com'>Sensei</a>&nbsp;
                as soon as possible. Thanks!
              </P>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { this.displayTableRows() }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={3}>
              <Button.Group size='mini' floated='left'>
                <Button
                  type='button'
                  color='green'
                  onClick={()=>this.showModal('create')}>
                  Create Contactee
                </Button>
              </Button.Group>
              <Paginator
                loadMore={this.loadMore}
                pagination={this.props.pagination} />
              { modal &&
                <ContracteeModal
                  type={modal}
                  closeModal={this.closeModal}
                  contracteeId={contracteeId} />
              }
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contractees: state.contractees.data,
    pagination: state.contractees.pagination,
  }
}

export default connect(mapStateToProps)(ContracteesTable)
