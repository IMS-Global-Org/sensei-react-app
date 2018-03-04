import React, { Component } from 'react'
import {
  Container, Segment, Header, Icon,
} from 'semantic-ui-react'
import styled from 'styled-components'
import ContactUsForm from './ContactUsForm'

// Custom Styled Components
const InstructionsArea = styled(Segment)`
  width: 50%;
  margin: 0 25% !important;
`

class ContactUs extends Component {
  defaults = {}
  state = { ...this.defaults }
  initialFormValues = {
    first_name: '',
    last_name: '',
    phone: '',
    subject: '',
    body: '',
  }

  handleOnSubmit = ( json ) => {
    debugger
  }

  render(){
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
              Contact us with all your question and comments about Bobby Lawrence Karate and it's programs,
              by completing the form below and submiting it to the Sensei. The
              Sensei will then contact you as soon as possible with a response
              to your questions. We encourage the use of the form below as it provides
              a way to ensure the security of your message and also the privacy of
              both parties.
            </p>
          </Segment>
        </InstructionsArea>
        <Segment>
          <ContactUsForm
            onSubmit={this.handleOnSubmit}
            initialValues={this.initialFormValues} />
        </Segment>
      </Container>
    )
  }
}

export default ContactUs
