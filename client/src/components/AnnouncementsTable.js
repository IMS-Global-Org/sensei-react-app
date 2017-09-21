import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Header } from 'semantic-ui-react'
import moment from 'moment'
import { tableAnnouncements } from '../actions/announcements'
import Paginator from './Paginator'
import DateRange from './DateRange'

class AnnouncementsTable extends Component {
  state={ hasMore: false, dateRange: null }

  /**
   * Load the initial data set and allow more records to be obtained
   */
  componentDidMount = () => {
    const { notices, dispatch } = this.props
    if( !notices || notices.data.length <= 0 ) {
      dispatch(tableAnnouncements(1,5,this.state.dateRange))
      this.setState({ hasMore: true })
    }
  }

  displayTableRow = () => {
    const { notices } = this.props
    if( notices && notices.data.length > 0 ) {
      return notices.data.map( notice => {
        return (
          <Table.Row
            key={notice.id}
            onClick={ () => this.handleRowClick(notice.id) }>
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

  loadMore = ( page ) => {
    let { hasMore } = this.state
    let { notices: { pagination }, dispatch } = this.props
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(tableAnnouncements(page,5,this.state.dateRange))
        this.setState({ activeItem: page })
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  handleRowClick = ( announcementId ) => {
    let { notices: { data } } = this.props
    let item = data.find( notice => {
      return parseInt(notice.id,10) === parseInt(announcementId,10)
    })
    this.props.handleActiveAnnouncement(item)
  }

  /**
   * Handler for setting the current set of selected dates
   * @param {Object} dateRange - start and end dates as moment objects
   */
  handleDateRange = ( dateRange ) => {
    this.setState({ dateRange })
  }

  /**
   * Handler for clearing set dates and then re-rendering the complete
   * data set
   */
  handleShowAll = () => {
    this.setState({
      dateRange: null
    }, () => {
      this.loadMore( null, { name: 1 } )
    })
  }

  render() {
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={4}>
              <Header as='h1' textAlign='center'>
                Instructions
              </Header>
              <p style={{ textAlign: 'justify', margin: '2rem 5rem' }}>
                Below you will find a table listing the notices that are
                currently in the database. Next you will find a form that
                allows you to create, update or remove notices from the
                database. If a current notice needs to be updated or changed
                simply click on the table row where the notice is being listed
                and its information will appear in the form below the table.
                Make any changes that you see fit and then click the update
                button. The form also has functions for creating new notices,
                deleting old ones, and so forth. Please contact the&nbsp;
                <a href='mailto:sensei_ou_unit@blkdojos.com'>Sensei</a>&nbsp;
                with any questions or problems that are found. Thanks!
              </p>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
            <Table.HeaderCell>Registration</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { this.displayTableRow() }
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={4}>
              <DateRange
                inline
                handleDateRange={this.handleDateRange}
                button
                handleDateQuery={this.loadMore}
                handleShowAll={this.handleShowAll} />
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
