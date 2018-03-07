import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Comment, Header } from 'semantic-ui-react'

class ContactUsManager extends Component {
  defaults = {}
  state = { ...this.defaults }

  renderEmailCorrespondance = () => {
    const { emails } = this.props
    if( emails && emails.length > 0 ) {
      return emails.map( email => {
        return (
          <Comment>
            <Comment.Avatar></Comment.Avatar>
            <Comment.Content></Comment.Content>
            <Comment.MetaData></Comment.MetaData>
            <Comment.Text></Comment.Text>
            <Comment.Action></Comment.Action>
          </Comment>
        )
      })
    }
  }

  render = () => {
    return (
      <Container>
        <Segment>
          <Comment.Group threaded>
            <Header as='h3' dividing>E-mail Correspondance</Header>
            { this.renderEmailCorrespondance() }
          </Comment.Group>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    emails: state.contactus.emails,
  }
}

export default connect(mapStateToProps)(ContactUsManager)
