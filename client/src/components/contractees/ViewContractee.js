import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Label, List } from 'semantic-ui-react'
import styled from 'styled-components'

// Actions
import {
  showCompleteContractee,
  clearContractee,
} from '../../actions/contractees'

// Custom Styled Components
const TypeOf = styled.span`
  display: inline-block;
  margin-left: 2rem;
`

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
        dispatch(showCompleteContractee(contracteeId,
            ()=>this.setState({ isLoaded: true })))
      }
    }
  }

  listAddresses = () => {
    const { contractee: {addresses} } = this.props
    if( addresses && addresses.length > 0 ) {
      return addresses.map( address => {
        return (
          <List.Item>
            {address.street1}
            <br />
            {address.street2}
            <br />
            {`${address.city}, ${address.state} ${address.zipcode}`}
            <br />
            {address.country || ''}
          </List.Item>
        )
      })
    }
  }

  listEmailAddresses = () => {
    const { contractee: {emails} } = this.props
    if( emails && emails.length > 0 ) {
      return emails.map( email => {
        return (
          <List.Item>
            {email.address}
            <TypeOf>{email.type_of}</TypeOf>
          </List.Item>
        )
      })
    }
  }

  listPhoneNumbers = () => {
    const { contractee: {phones} } = this.props
    if( phones && phones.length > 0 ) {
      return phones.map( phone => {
        return (
          <List.Item>
            {phone.number}
            <TypeOf>
              {phone.type_of}
            </TypeOf>
          </List.Item>
        )
      })
    }
  }

  render = () => {
    return (
      <Segment basic>
        <Grid columns={2}>
          <Grid.Row strectched>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Personal Information</Label>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Addresses</Label>
                <List divided relaxed>
                  { this.listAddresses() }
                </List>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>E-mail Addresses</Label>
                <List divided relaxed>
                  { this.listEmailAddresses() }
                </List>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Phone Numbers</Label>
                <List divided relaxed>
                  { this.listPhoneNumbers() }
                </List>
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
