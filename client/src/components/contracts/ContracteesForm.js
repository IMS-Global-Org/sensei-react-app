import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Dropdown, Button } from 'semantic-ui-react'
import ContracteeList from './ContracteeList'


import {
  indexContractees,
  queryContractees,
  addContractee,
  clearContractees,
} from '../../actions/contractees.js'


class ContracteesForm extends Component {
  state = { contractId: '', selected: '' }

  componentDidMount = () => this.loadContractId(this.props)
  componentWillReceiveProps = ( props ) => this.loadContractId(props)
  componentWillUnmount = () => this.props.dispatch(clearContractees())
  loadContractId = ( props ) => {
    const { dispatch, contractees, contractId } = props
    if( contractId !== this.state.contractId ) {
      if( !contractees || contractees.length <= 0 ) {
        dispatch(indexContractees(contractId))
        this.setState({ contractId })
      }
    }
  }

  listPossibleContractees = () => {
    // TODO: filter out the possibles that are not part of the contactees list
    const { possibles, contractees } = this.props
    const actPossibles = []
    possibles.forEach( p => {
      if( !contractees.find( c => c.id === p.id ) ) {
        actPossibles.push(p)
      }
    })
    if( actPossibles && actPossibles.length > 0 ) {
      return actPossibles.map( possible => {
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
    const { dispatch } = this.props
    if( value.length >= 3 ) {
      dispatch(queryContractees(value))
    }
  }

  handleOnSubmit = () => {
    const { dispatch, contractId } = this.props
    const { selected } = this.state
    if( selected.length > 0 ) {
      dispatch(addContractee(contractId,selected,
        ()=>this.setState({ selected: '' })))
    }
  }

  handleContracteeUpdate = ( event, {value} ) => {
    const { contractees } = this.props
    if( value.length > 0 ) {
      const okList = []
      for( let val of value ){
        val = parseInt(val,10)
        if( !contractees.find( c => c.id === val) ) { okList.push(val) }
      }
      this.setState({ selected: okList })
    } else
      this.setState({ selected: '' })
  }

  render = () => {
    const { selected } = this.state

    return (
      <Form>
        <Form.Group widths='three'>
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
            onChange={this.handleContracteeUpdate} />
          <Form.Field>
            <Segment basic textAlign='center' vertical>
              <Button
                type='submit'
                color='green'
                size='mini'
                disabled={ selected.length <= 0 }
                onClick={this.handleOnSubmit}>
                Submit Changes
              </Button>
            </Segment>
          </Form.Field>
          <Form.Field>
            <ContracteeList contractId={this.props.contractId} />
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contractees: state.contractees.data,
    possibles: state.contractees.possibles,
  }
}

export default connect(mapStateToProps)(ContracteesForm)
