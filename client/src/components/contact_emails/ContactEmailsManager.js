import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, Segment, Divider,
  Comment, Header, Icon
} from 'semantic-ui-react'
import { ContactEmailFormat } from '../helpers/DateFormats'
import moment from 'moment'
import styled from 'styled-components'
import ContactEmailCorrespondanceForm from './ContactEmailCorrespondanceForm'
import Paginator from '../Paginator'

// Actions
import {
  indexContactEmails,
} from '../../actions/contact_emails'

// Custom Component Styles
const Date = styled.span`
  font-style: italic;
  font-size: 0.75rem;
`
const Phone = styled.div`
  font-style: italic;
  font-size: 0.75rem;
  padding: 0.25rem 3rem 0.15rem 3rem;
  ::before {
    content: 'Phone Number:';
    margin-right: 1rem;
    font-weight: bold;
    font-size: 0.9rem;
  }
`
const Address = styled.div`
  font-style: italic;
  font-size: 0.75rem;
  padding: 0.15rem 3rem 0.5rem 3rem;
  ::before {
    content: 'E-mail Address:';
    margin-right: 1rem;
    font-weight: bold;
    font-size: 0.9rem;
  }
`
const Subject = styled.div`
  padding: 0.5rem 2rem 0.25rem 2rem;
  ::before {
    content: 'Subject:';
    font-weight: bold;
    margin-right: 1rem;
  }
`
const Body = styled.div`
  padding: 0.25rem 3rem 0.25rem 3rem;
  ::before {
    content: 'Message:';
    font-weight: bold;
    margin-right: 1rem;
  }
`

class ContactEmailsManager extends Component {
  defaults = { hasMore: false }
  state = { ...this.defaults }

  componentDidMount = () => {
    const { emails, dispatch } = this.props
    if( !emails || emails.length <= 0 ) {
      dispatch(indexContactEmails())
      this.setState({ hasMore: true })
    }
  }

  loadMore = ( page ) => {
    const { pagination, dispatch } = this.props
    const { hasMore } = this.state
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexContactEmails(page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  renderEmailCorrespondance = () => {
    const { emails } = this.props
    if( emails && emails.length > 0 ) {
      return emails.map( email => {
        return (
          <Comment key={email.id}>
            <Comment.Content>
              <Comment.Avatar as={Icon} name='mail outline' />
              <Comment.Author>
                { `${email.last_name}, ${email.first_name}` }
              </Comment.Author>
              <Comment.Metadata>
                <Date>{ moment(email.created_at).format(ContactEmailFormat) }</Date>
              </Comment.Metadata>
              <Comment.Text style={{ padding: '0 2rem' }}>
                <Subject>{ email.subject }</Subject>
                <Body>{ email.body }</Body>
                <Phone>{ email.phone }</Phone>
                <Address>
                  <a href={`mailto:${email.address}`}>{email.address}</a>
                </Address>
              </Comment.Text>
              <Comment.Action>
                <ContactEmailCorrespondanceForm email={email} />
              </Comment.Action>
            </Comment.Content>
          </Comment>
        )
      })
    }
  }

  render = () => {
    return (
      <Container as={Segment}>
        <Header as='h3'>
          <Header.Content>E-mail Correspondance</Header.Content>
        </Header>
        <Divider />
        <Segment basic>
          <Comment.Group>
            { this.renderEmailCorrespondance() }
          </Comment.Group>
        </Segment>
        <Segment basic clearing>
          <Paginator
            size='tiny'
            loadMore={this.loadMore}
            pagination={this.props.pagination} />
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    emails: state.contact_emails.emails,
    pagination: state.contact_emails.pagination,
  }
}

export default connect(mapStateToProps)(ContactEmailsManager)
