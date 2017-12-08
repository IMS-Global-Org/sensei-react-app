import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import {
  Container, Segment, Table,
  Button, Header, Icon
} from 'semantic-ui-react'
import MailerModal from './MailerModal'
import User from '../User'

// Actions
import {
  indexMailers,
} from '../../actions/mailers'

class Mailers extends Component {
  state = { mailerId: '' }

  componentDidMount = () => {
    const { dispatch, mailers } = this.props
    if( !mailers || mailers.length <= 0 ) {
      dispatch(indexMailers())
    }
  }

  displayTableHeaders = () => {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Interval</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Active</Table.HeaderCell>
          <Table.HeaderCell>Recipients</Table.HeaderCell>
          <Table.HeaderCell>Subject</Table.HeaderCell>
          <Table.HeaderCell>Notify</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }

  displayTableFooter = () => {
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={7}>
            <Button
              type='button'
              onClick={this.displayNewForm}>
              New Mailer
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
  }

  displayNewForm = () => {
    this.setState({ mailerId: true })
  }

  displayTableBody = () => {
    const { mailers } = this.props
    if( mailers && mailers.length > 0 ) {
      return mailers.map( mailer => (
        <Table.Row
          key={mailer.id}
          onClick={()=>this.showMailer(mailer.id)}>
          <Table.Cell
            style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px'}}>
            {mailer.title}
          </Table.Cell>
          <Table.Cell>{mailer.interval}</Table.Cell>
          <Table.Cell>{mailer.type_of}</Table.Cell>
          <Table.Cell>{mailer.active ? 'Yes' : 'No'}</Table.Cell>
          <Table.Cell>{mailer.recipients}</Table.Cell>
          <Table.Cell
            style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px'}}>
            {mailer.subject}
          </Table.Cell>
          <Table.Cell>{mailer.notify ? 'Yes' : 'No'}</Table.Cell>
        </Table.Row>
      ))
    }
  }

  showMailer = ( mailerId ) => this.setState({ mailerId })
  resetMailer = () => this.setState({ mailerId: '' })

  render() {
    if( !(new User()).isAdmin() ) {
      return ( <Redirect to='/' /> )
    }
    const { mailerId } = this.state
    return (
      <Container>
        <Segment>
          <Header as='h1' icon textAlign='center'>
            <Icon name='info circle' />
            <Header.Content>
              Information
            </Header.Content>
          </Header>
          <p style={{ textAlign: 'justify', margin: '2rem 5rem' }}>
            Mailers are for automating certain tasks that need to be run
            during specific times so that recipients are informed of
            activities or reports that are pertinent to blk students.
            By clicking on a table row that corresponds to a mailer,
            the mailer's information will be presented below the table in
            a form. This is where mailers can be created, updated or deleted
            as needed. Please contact the&nbsp;
            <a href='mailto:sensei_ou_unit@blkdojos.com'>Sensei</a>
            &nbsp; with any questions or problems relating to the mailers.
            Thanks!
          </p>
        </Segment>
        <Table celled>
          { this.displayTableHeaders() }
          <Table.Body>
            { this.displayTableBody() }
          </Table.Body>
          { this.displayTableFooter() }
        </Table>
        { mailerId &&
          <MailerModal
            resetMailer={this.resetMailer}
            mailerId={mailerId} />
        }
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    mailers: state.mailers.data,
  }
}

export default connect(mapStateToProps)(Mailers)
