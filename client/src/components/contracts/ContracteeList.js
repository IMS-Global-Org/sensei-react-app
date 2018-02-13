import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Button, List, Image, Label } from 'semantic-ui-react'

// Actions
import {
  indexContractees,
  deleteContractee,
  clearContractees,
} from '../../actions/contractees'
import {
  filterContractContractee,
} from '../../actions/contracts'

class ContracteeList extends Component {
  state = { contractId: '' }

  componentDidMount = () => this.loadContractees(this.props)
  componentWillReceiveProps = ( props ) => this.loadContractees(props)
  componentWillUnmount = () => this.props.dispatch(clearContractees())
  loadContractees = ( props ) => {
    const { dispatch, contractees, contractId } = this.props
    if( contractId !== this.state.contractId ){
      if( !contractees || contractees.length <= 0 ) {
        dispatch(indexContractees(contractId))
        this.setState({ contractId })
      }
    }
  }

  handleRemoveContractee = ( contracteeId ) => {
    const { dispatch, contractId } = this.props
    dispatch(deleteContractee(contractId,contracteeId))
    dispatch(filterContractContractee(contractId,contracteeId))
  }

  displayContractees = () => {
    const { contractees } = this.props
    if( contractees && contractees.length > 0 ) {
      return contractees.map( contractee => {
        return (
          <List.Item key={contractee.id}>
            { contractee.image &&
              <Image avatar src={contractee.image || ''} />
            }
            <List.Content>
              <List.Header>
                <Button
                  basic
                  type='button'
                  icon='delete'
                  size='mini'
                  style={{ marginLeft: '2rem' }}
                  onClick={()=>this.handleRemoveContractee(contractee.id)} />
                {`${contractee.last}, ${contractee.first}`}
              </List.Header>
            </List.Content>
          </List.Item>
        )
      })
    }
  }

  render = () => {
    return (
      <Segment raised>
        <Label ribbon>Contractees List</Label>
        <List animated verticalAlign='middle'>
          { this.displayContractees() }
        </List>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contractees: state.contractees.data,
  }
}

export default connect(mapStateToProps)(ContracteeList)
