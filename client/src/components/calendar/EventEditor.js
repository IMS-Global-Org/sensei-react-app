import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Table } from 'semantic-ui-react'
import moment from 'moment'

// Custom Components
import Paginator from '../Paginator'
import EventEditorForm from './EventEditorForm'

// Actions
import {
  paginateCalendarEvents,
} from '../../actions/calendar/calendar'

/**
 * Access to the calendar events for editing, creating and deleting
 * @author Brennick Langston
 * @version 0.0.1
 */
class EventEditor extends Component {
  /**
   * @type {Object}
   * @property {Object} dates - default start and finish dates
   * @property {Boolean} hasMore - Flag for obtaining more event records
   * @property {Integer} eventId - event id number of the clicked event
   */
  state = { dates: null, hasMore: false, eventId: null }

  /**
   * Set the initial state of the component and retrieve the events for
   * the current month
   */
  componentDidMount = ( state ) => {
    let { dates } = this.state
    const { events } = this.props
    if( !dates ) {
      const today = moment.utc()
      const prev = today.clone().subtract(3,'months')
      const next = today.clone().add(3,'months')
      dates = {
        start: moment.utc().year(prev.year())
          .month(prev.month()).date(1),
        finish: moment.utc().year(next.year())
          .month(next.month()).date(next.daysInMonth())
      }
      this.setState({ dates }, () => {
        this.loadCalendarEvents( events, dates )
      })
    } else {
      this.loadCalendarEvents( events, dates )
    }
  }

  /**
   * Helper function for the loading the events that coincide with the
   * current calendar month
   * @param {Array} events - list of events for the current displayed month
   * @param {Object} dates - start and finish dates for obtaining events
   */
  loadCalendarEvents = ( events, dates ) => {
    const { dispatch } = this.props
    if( !events || events.length <= 0 ) {
      dispatch(paginateCalendarEvents(dates))
      this.setState({ hasMore: true })
    }
  }

  /**
   * Helper function for when the event editor has dates passed in as props
   * @param {Object} nextProps - the props the component will receive
   */
  componentWillReceiveProps = ( nextProps ) => {
    const { dates } = nextProps
    if( dates ) {
      this.setState({
        dates
      })
    }
  }

  /**
   * Displays the information for a single event in a table row format
   */
  displayTableRows = () => {
    const { events } = this.props
    if( events && events.length > 0 ) {
      return events.map( (event,index) => {
        return (
          <Table.Row key={index} onClick={() => this.handleRowClick(event.id)}>
            <Table.Cell>
              {moment(event.start).format('DD MMM YYYY, HH:mm a')}
            </Table.Cell>
            <Table.Cell>
              {moment(event.finish).format('DD MMM YYYY, HH:mm a')}
            </Table.Cell>
            <Table.Cell>{event.title}</Table.Cell>
            <Table.Cell>{event.category}</Table.Cell>
            <Table.Cell>{event.description}</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  handleRowClick = ( eventId ) => this.setState({ eventId })

  /**
   * Loader for the calendar events. Loads by page number.
   * @param {Integer} page - the page number of events that is to be rendered
   */
  loadMore = ( page ) => {
    const { hasMore } = this.state
    const { paginate, dispatch } = this.props
    if( hasMore && paginate.total_pages ) {
      if( page <= paginate.total_pages ) {
        dispatch(paginateCalendarEvents(this.state.dates,page))
        this.setState({ activeItem: page })
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  /**
   * Render function for the main component
   */
  render() {
    return (
      <Container>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={2} textAlign='center'>
                Dates
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign='center'>
                Title
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign='center'>
                Category
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan={2} textAlign='center'>
                Description
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Start</Table.HeaderCell>
              <Table.HeaderCell>Finish</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { this.displayTableRows() }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={5}>
                  <Paginator
                    pagination={this.props.paginate}
                    loadMore={this.loadMore} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <EventEditorForm eventId={this.state.eventId} />
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    events: state.calendar.events,
    paginate: state.calendar.paginate,
  }
}

export default connect(mapStateToProps)(EventEditor)
