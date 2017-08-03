import React, { Component } from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'
import { Segment, Form } from 'semantic-ui-react'
import styled from 'styled-components'

// Custom Styled Components
const Spacer = styled.div`
  display: inline-block;
  width: 3rem !important;
`
const RangeArea = styled(Segment)`
  margin: 0 0 !important;
  padding: 0 0 !important;
`

/**
 * @author Brennnick Langston
 * @version 0.0.1
 * NOTE the following must be passed as props from the parent component
 *      - reference to the starting date
 *      - reference to the ending date
 *      - handler for changes to the starting date
 *      - handler for changes to the ending date
 */
class DateRange extends Component {
  state={ hasMore: false, start_date: moment.utc(), end_date: moment.utc() }

  /**
   * Handles the starting date
   * @param {moment} moment - current selected starting date
   */
  handleStartDate = ( moment ) => this.setState({ start_date: moment })
  /**
   * Handles the ending date
   * @param {moment} moment - current selected ending date
   */
  handleEndDate = ( moment ) => this.setState({ end_date: moment })

  render() {
    const { stacked, inline } = this.props
    return (
      <RangeArea basic compact floated='left'>
        <Form>
          <Form.Group inline={inline} >
            <label>Start Time</label>
            { stacked && <br /> }
            <Datetime
              id='start_date'
              value={this.state.start_date}
              onChange={this.handleStartDate} />
            { stacked ? <br /> : <Spacer />  }
            <label>End Date</label>
            { stacked && <br /> }
            <Datetime
              id='end_date'
              value={this.state.end_date}
              onChange={this.handleEndDate} />
          </Form.Group>
        </Form>
      </RangeArea>
    )
  }
}

export default DateRange
