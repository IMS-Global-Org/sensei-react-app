import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Header } from 'semantic-ui-react'
import LabelField from '../helpers/LabelField'

class ContactEmailSentMessage extends Component {

  render = () => {
    const { first_name, last_name, phone, subject, body } = this.props.email

    return (
      <Segment basic>
        <Segment basic>
          <Header as='h3' textAlign='center'>
            <Header.Content>Congratulations!</Header.Content>
            <Header.Subheader>
              Your E-Mail Message was successfully sent! The Sensei will get
              back in contact with you shortly. In the meanwhile, please feel
              free to visit BLK Castel Valley's site and become further informed
              about our activities. Thanks!
            </Header.Subheader>
          </Header>
        </Segment>
        <Grid celled='internally'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <LabelField bold>First Name</LabelField>
              { first_name }
            </Grid.Column>
            <Grid.Column>
              <LabelField bold>Last Name</LabelField>
              { last_name }
            </Grid.Column>
            <Grid.Column>
              <LabelField bold>Phone</LabelField>
              { phone }
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <LabelField bold>Subject</LabelField>
              <p>{ subject }</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={1}>
            <Grid.Column>
              <LabelField bold>Message</LabelField>
              <p>{ body }</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    email: state.contact_emails.email,
  }
}

export default connect(mapStateToProps)(ContactEmailSentMessage)
