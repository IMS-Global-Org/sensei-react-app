import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, Segment, Header, Icon, List,
} from 'semantic-ui-react'
import styled from 'styled-components'
import ContactEmailForm from './ContactEmailForm'
import ContactEmailSentMessage from './ContactEmailSentMessage'

// Actions
import { createContactEmail } from '../../actions/contact_emails'

// Custom Styled Components
const InstructionsArea = styled(Segment)`
  width: 50%;
  margin: 0 25% !important;
`

class ContactEmail extends Component {
  defaults = {
    showSentMessage: false,
  }
  state = { ...this.defaults }
  initialFormValues = {
    first_name: '',
    last_name: '',
    phone: '',
    subject: '',
    body: '',
  }

  handleOnSubmit = ( json ) => {
    const { dispatch } = this.props
    dispatch(
      createContactEmail(json,()=>{
        this.setState({ showSentMessage: true })
      })
    )
  }

  render(){
    const { showSentMessage } = this.state

    return (
      <Container>
        <InstructionsArea>
          <Header as='h1' icon textAlign='center'>
            <Icon name='mail outline' circular />
            <Header.Content>
              Contact Us
            </Header.Content>
          </Header>
          <Segment>
            <p style={{ textAlign: 'justify' }}>
              Contact us with all your questions and comments about Bobby
              Lawrence Karate and it's programs, by completing the form below.
            </p>
              <List style={{ marginLeft: '3rem' }}>
                <List.Item>You may also contact us at:</List.Item>
                <List.Item>
                  <List.Icon name='text telephone' />
                  <List.Content>
                    435-748-5735
                  </List.Content>
                </List.Item>
              </List>
            <p>
              We hope to have you join us at our school soon!
            </p>
          </Segment>
        </InstructionsArea>
        <Segment>
          { showSentMessage
            ? <ContactEmailSentMessage />
            : <ContactEmailForm
                onSubmit={this.handleOnSubmit}
                initialValues={this.initialFormValues} />
          }
        </Segment>
      </Container>
    )
  }
}

export default connect()(ContactEmail)
