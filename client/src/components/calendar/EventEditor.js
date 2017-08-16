import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Table } from 'semantic-ui-react'
import moment from 'moment'

// Custom Components
import Paginator from '../Paginator'

// Actions
import {
  paginateCalendarEvents,
} from '../../actions/calendar/calendar'

class EventEditor extends Component {
  state = { dates: null, hasMore: false }

  /**
   * Set the initial state of the component and retrieve the events for
   * the current month
   */
  componentDidMount = ( state ) => {
    let { dates } = this.state
    const { events } = this.props
    if( !dates ) {
      const today = moment.utc()
      dates = {
        start: moment.utc().year(today.year())
          .month(today.month()).date(1),
        finish: moment.utc().year(today.year())
          .month(today.month()).date(today.daysInMonth())
      }
      this.setState({ dates }, () => {
        this.loadCalendarEvents( events, dates )
      })
    } else {
      this.loadCalendarEvents( events, dates )
    }
  }

  loadCalendarEvents = ( events, dates ) => {
    const { dispatch } = this.props
    if( !events || events.length <= 0 ) {
      dispatch(paginateCalendarEvents(dates))
      this.setState({ hasMore: true })
    }
  }

  componentWillReceiveProps = ( nextProps ) => {
    const { dates } = nextProps
    if( dates ) {
      this.setState({
        dates
      })
    }
  }

  displayTableRows = () => {
    const { events } = this.props
    if( events && events.length > 0 ) {
      return events.map( event => {
        return (
          <Table.Row>
            <Table.Cell>{event.start}</Table.Cell>
            <Table.Cell>{event.finish}</Table.Cell>
            <Table.Cell>{event.title}</Table.Cell>
            <Table.Cell>{event.category}</Table.Cell>
            <Table.Cell>{event.description}</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

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
              <Paginator
                pagination={this.props.paginate}
                loadMore={this.loadMore} />
            </Table.Row>
          </Table.Footer>
        </Table>
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
