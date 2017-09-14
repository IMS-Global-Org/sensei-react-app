import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment, Table } from 'semantic-ui-react'
import MailerModal from './MailerModal'

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
            Paginator Component
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
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
    const { mailerId } = this.state
    return (
      <Container>
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
