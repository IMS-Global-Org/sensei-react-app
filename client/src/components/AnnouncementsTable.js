import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import moment from 'moment'
import { tableAnnouncements } from '../actions/announcements'
import Paginator from './Paginator'

class AnnouncementsTable extends Component {
  state = { hasMore: false }

  /**
   * Load the initial data set and allow more records to be obtained
   */
  componentDidMount = () => {
    const { notices, dispatch } = this.props
    if( !notices || notices.data.length <= 0 ) {
      dispatch(tableAnnouncements(1))
      this.setState({ hasMore: true })
    }
  }

  displayTableRow = () => {
    const { notices } = this.props
    if( notices && notices.data.length > 0 ) {
      return notices.data.map( notice => {
        return (
          <Table.Row onClick={this.handleRowClick}>
            <Table.Cell>edit</Table.Cell>
            <Table.Cell>
              {notice.title}
            </Table.Cell>
            <Table.Cell>
              { moment(notice.start_date).local().format('dd, MMM Do YYYY, h:mm a') }
            </Table.Cell>
            <Table.Cell>
              { moment(notice.end_date).local().format('dd, MMM Do YYYY, h:mm a') }
            </Table.Cell>
            <Table.Cell>{ notice.registration ? 'Yes' : 'No' }</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  loadMore = ( e, { name: page } ) => {
    let { hasMore } = this.state
    let { notices: { pagination }, dispatch } = this.props
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(tableAnnouncements(page))
        this.setState({ activeItem: page })
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  handleRowClick = ( event ) => {
    debugger
  }

  render() {
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Start Date</Table.HeaderCell>
          <Table.HeaderCell>End Date</Table.HeaderCell>
          <Table.HeaderCell>Registration</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          { this.displayTableRow() }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={5}>
              <Paginator
                pagination={this.props.notices.pagination}
                loadMore={this.loadMore} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { notices: state.announcements }
}

export default connect(mapStateToProps)(AnnouncementsTable)
