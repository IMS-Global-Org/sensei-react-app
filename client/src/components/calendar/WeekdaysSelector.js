import React, { Component } from 'react'
import { Form, Checkbox } from 'semantic-ui-react'

/**
 * Checkbox group. One checkbox for each day of the week.
 * @version 0.1.0
 */
class WeekdaysSelector extends Component {
  /**
   * @type {Object}
   * @property {String} defaults.Sun
   * @property {String} defaults.Mon
   * @property {String} defaults.Tue
   * @property {String} defaults.Wed
   * @property {String} defaults.Thu
   * @property {String} defaults.Fri
   * @property {String} defaults.Sat
   */
  defaults = {
    Sun: 0, Mon: 0, Tue: 0, Wed: 0,
    Thu: 0, Fri: 0, Sat: 0,
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadWeekdays(this.props)
  componentWillReceiveProps = ( props ) => this.loadWeekdays(props)
  loadWeekdays = ( props ) => {
    const { weekday } = props
    if( weekday ) {
      this.setState({ ...weekday })
    } else {
      this.setState({ ...this.defaults })
    }
  }

  checkboxChange = (e,{id,checked}) => {
    this.setState({ [id]: checked ? 1 : 0 })
  }

  checkedWeekday = () => { return this.state }

  renderWeekdays = () => {
    let weekdays = []
    Object.entries(this.state).forEach( weekday => {
      if( weekday[0] !== 'id' ) {
        weekdays.push(
          <Form.Field key={weekday[0]}>
            <Checkbox
              name={weekday[0]}
              id={weekday[0]}
              checked={weekday[1] ? true : false}
              label={weekday[0]}
              onChange={this.checkboxChange} />
          </Form.Field>
        )
      }
    })
    return weekdays
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
