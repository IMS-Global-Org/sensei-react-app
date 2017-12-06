import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Label } from 'semantic-ui-react'
import ViewPersonalInfo from './ViewPersonalInfo'
import ViewAddresses from './ViewAddresses'
import ViewEmails from './ViewEmails'
import ViewPhones from './ViewPhones'

// Actions
import {
  showCompleteContractee,
  clearContractee,
} from '../../actions/contractees'

class ViewContractee extends Component {
  state = { isLoaded: false }

  componentDidMount = () => this.loadContractee(this.props)
  componentWillReceiveProps = ( props ) => this.loadContractee(props)
  componentWillUnmount = () => this.props.dispatch(clearContractee())
  loadContractee = ( props ) => {
    const { dispatch, contractee, contracteeId } = props
    const { isLoaded } = this.state
    if( !isLoaded ) {
      if( !contractee || contractee.length <= 0 ) {
        dispatch(showCompleteContractee(contracteeId))
        this.setState({ isLoaded: true })
      }
    }
  }

  render = () => {
    const { contractee } = this.props
    return (
      <Segment basic>
        <Grid columns={2} stretched>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Personal Information</Label>
                <ViewPersonalInfo contractee={contractee} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Addresses</Label>
                <ViewAddresses
                  editor
                  addresses={contractee.addresses}
                  contracteeId={contractee.id} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>E-mail Addresses</Label>
                <ViewEmails
                  editor
                  emails={contractee.emails}
                  contracteeId={contractee.id} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Phone Numbers</Label>
                <ViewPhones
                  phones={contractee.phones}
                  contracteeId={contractee.id} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contractee: state.contractees.contractee,
  }
}

export default connect(mapStateToProps)(ViewContractee)
