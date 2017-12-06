import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import EditPersonalInfo from './EditPersonalInfo'
import EditAddresses from './EditAddresses'

// Actions
import {
  showCompleteContractee,
  clearContractee,
} from '../../actions/contractees'

class EditContractee extends Component {
  state = { contracteeId: '' }

  componentDidMount = () => this.loadContractee(this.props)
  componentWillReceiveProps = ( props ) => this.loadContractee(props)
  componentWillUnmount = () => this.props.dispatch(clearContractee())
  loadContractee = ( props ) => {
    const { dispatch, contracteeId } = this.props
    if( contracteeId !== this.state.contracteeId ) {
      dispatch(showCompleteContractee(contracteeId))
      this.setState({ contracteeId })
    }
  }

  render = () => {
    const { contractee } = this.props
    return (
      <Segment>
        <EditPersonalInfo contractee={contractee} />
        <EditAddresses
          addresses={contractee.addresses}
          contracteeId={contractee.id} />
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contractee: state.contractees.contractee,
  }
}

export default connect(mapStateToProps)(EditContractee)
