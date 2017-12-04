import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Label, List } from 'semantic-ui-react'
import { BirthdateFormat } from '../helpers/DateFormats'
import moment from 'moment'
import ViewAddresses from './ViewAddresses'
import ViewEmails from './ViewEmails'
import ViewPhones from './ViewPhones'
import LabelField from './LabelField'

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

  listPersonalInfo = () => {
    const { contractee } = this.props
    const bday = moment(contractee.birthdate).format(BirthdateFormat)
    return (
      <List divided relaxed>
        <List.Item>
          <LabelField>Name</LabelField>
          {`${contractee.last}, ${contractee.first}`}
        </List.Item>
        <List.Item>
          <LabelField>Birthdate</LabelField>
          {bday}
        </List.Item>
      </List>
    )
  }

  // listAddresses = () => {
  //   const { contractee: {addresses} } = this.props
  //   if( addresses && addresses.length > 0 ) {
  //     return addresses.map( address => {
  //       return (
  //         <List.Item key={address.id}>
  //           <Grid divided>
  //             <Grid.Row columns={16}>
  //               <Grid.Column width={4}>
  //                 {address.type_of}
  //               </Grid.Column>
  //               <Grid.Column width={12}>
  //                 {address.street1}
  //                 <br />
  //                 {address.street2}
  //                 <br />
  //                 {`${address.city}, ${address.state}   ${address.zipcode}`}
  //                 <br />
  //                 {address.country || ''}
  //               </Grid.Column>
  //             </Grid.Row>
  //           </Grid>
  //         </List.Item>
  //       )
  //     })
  //   }
  // }

  // listEmailAddresses = () => {
  //   const { contractee: {emails} } = this.props
  //   if( emails && emails.length > 0 ) {
  //     return emails.map( email => {
  //       return (
  //         <List.Item key={email.id}>
  //           <TypeOf>{email.type_of}</TypeOf>
  //           {email.address}
  //         </List.Item>
  //       )
  //     })
  //   }
  // }

  // listPhoneNumbers = () => {
  //   const { contractee: {phones} } = this.props
  //   if( phones && phones.length > 0 ) {
  //     return phones.map( phone => {
  //       return (
  //         <List.Item key={phone.id}>
  //           <TypeOf>
  //             {phone.type_of}
  //           </TypeOf>
  //           {phone.phone_number}
  //         </List.Item>
  //       )
  //     })
  //   }
  // }

  render = () => {
    const { contractee: {addresses, emails, phones}} = this.props
    return (
      <Segment basic>
        <Grid columns={2} stretched>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Personal Information</Label>
                { this.listPersonalInfo() }
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Addresses</Label>
                <ViewAddresses addresses={addresses} />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>E-mail Addresses</Label>
                <ViewEmails emails={emails} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                <Label ribbon>Phone Numbers</Label>
                <ViewPhones phones={phones} />
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
