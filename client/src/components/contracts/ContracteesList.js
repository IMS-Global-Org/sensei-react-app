import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Dropdown, Button, List, Image } from 'semantic-ui-react'
import styled from 'styled-components'


import {
  indexContractees,
  queryContractees,
  createContractee,
  deleteContractee,
  clearContractees
} from '../../actions/contractees.js'

// Custom Styled Components
const Remove = styled(Button)`
margin-left: 1rem;
`

class ContracteesList extends Component {
  state = {}

  componentDidMount = () => this.loadContractId(this.props)
  componentWillReceiveProps = ( props ) => this.loadContractId(props)
  componentWillUnmount = () => this.props.dispatch(clearContractees())
  loadContractId = ( props ) => {
    const { dispatch, contractees, contractId } = props
    if( !contractees || contractees.length <= 0 ) {
      dispatch(indexContractees(contractId))
    }
  }

  displayContractees = () => {
    const { contractees } = this.state
    if( contractees && contractees.length > 0 ) {
      return contractees.map( contractee => {
        return (
          <List.Item>
            <Image avatar src={contractee.image || ''} />
            <List.Content>
              <List.Header>
                {`${contractee.last}, ${contractee.first}`}
                <Remove
                  type='button'
                  icon='delete'
                  size='mini'
                  onClick={()=>this.handleRemoveContractee(contractee.id)} />
              </List.Header>
            </List.Content>
          </List.Item>
        )
      })
    }
  }

  listPossibleContractees = () => {
      const { possibles } = this.props
      if( possibles && possibles.length > 0 ) {
        return possibles.map( possible => {
          return {
            key: possible.id,
            value: possible.id,
            text: `${possible.last}, ${possible.first}`
          }
        })
      } else
        return []
  }

  filterPossibleContractees = ( event ) => {
    const { target: {value}} = event
    const { dispatch, contractId } = this.props
    if( value.length >= 3 ) {
      dispatch(queryContractees(contractId,value))
    }
  }

  handleNewContractee = ( event, data ) => {
    const { dispatch, contractId } = this.props
    const { id, value } = data
    // TODO: add each to an array for holding
    // TODO: upon loss of focus send requests to the server in batch form
    dispatch(createContractee(contractId,value))
  }

  handleRemoveContractee = ( contracteeId ) => {
    const { dispatch, contractId } = this.props
    dispatch(deleteContractee(contractId,contracteeId))
  }

  render = () => {
    return (
      <Form.Group widths='two'>
        <Form.Field
          control={Dropdown}
          label='Contractees'
          id='contractee'
          fluid
          multiple
          search
          selection
          options={this.listPossibleContractees()}
          onSearchChange={this.filterPossibleContractees}
          onChange={this.handleNewContractee} />
        <Segment>
          <List animated verticalAlign='middle'>
            { this.displayContractees() }
          </List>
        </Segment>
      </Form.Group>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contractees: state.contractees.data,
    possibles: state.contractees.possibles,
  }
}

export default connect(mapStateToProps)(ContracteesList)
