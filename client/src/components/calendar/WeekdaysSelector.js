import React, { Component } from 'react'
import { Form, Checkbox } from 'semantic-ui-react'

class WeekdaysSelector extends Component {
  defaults = {
    Sun: false, Mon: false, Tue: false, Wed: false,
    Thu: false, Fri: false, Sat: false,
  }
  state = { ...this.defaults }
  weekdays = ''

  componentDidMount = () => this.loadWeekdays(this.props)
  componentWillReceiveProps = ( props ) => this.loadWeekdays(props)
  loadWeekdays = ( props ) => {
    const { weekdays } = this.props
    if( weekdays && weekdays !== this.weekdays ) {
      const weekdayObj = {}
      weekdays.split(',').forEach( weekday => weekdayObj[weekday] = true )
      this.setState({ ...this.defaults, ...weekdayObj })
      this.weekdays = weekdays
    }
  }

  checkboxChange = (e,{id,checked}) => {
    this.setState({ [id]: checked })
  }

  checkedWeekdays = () => {
    let weekdays = []
    Object.entries(this.state).forEach( weekday => {
      if( weekday[1] ) {
        weekdays.push( weekday[0] )
      }
    })
    return weekdays.join(',')
  }

  renderWeekdays = () => {
    return Object.entries(this.state).map( weekday => (
      <Form.Field key={weekday[0]}>
        <Checkbox
          name={weekday[0]}
          id={weekday[0]}
          checked={weekday[1]}
          label={weekday[0]}
          onChange={this.checkboxChange} />
      </Form.Field>
    ))
  }

  render = () => {
    return (
      <Form.Group inline widths='equal'>
        <label>Weekdays</label>
        { this.renderWeekdays() }
      </Form.Group>
    )
  }
}

export default WeekdaysSelector
