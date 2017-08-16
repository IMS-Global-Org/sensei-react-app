import React, { Component } from 'react'
import { Segment, Popup, Icon, Header, Divider } from 'semantic-ui-react'
import styled from 'styled-components'

// Custom styled components
const Event = styled.div`
  padding: 0.15 0.5rem;
`
const Title = styled(Header)`
  width: 25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Date = styled.p`
  text-align: center;
`

class CalendarEvent extends Component {
  dateFormat = 'dddd, MMMM Do YYYY, h:mm:ss a'

  render() {
    const { event } = this.props
    return (
      <Popup trigger={<Event><Icon name='calendar outline' />{event.category}</Event>}>
        <Popup.Content>
          <Segment basic>
            <Header as='h3' icon textAlign='center'>
              <Icon name='calendar outline' circular />
              <Header.Content>
                <Title>{ event.title }</Title>
              </Header.Content>
            </Header>
            <Divider />
            <Header as='h5' textAlign='center'>Start</Header>
            <Date>{ event.start.format(this.dateFormat) }</Date>
            <Header as='h5' textAlign='center'>Finish</Header>
            <Date>{ event.finish.format(this.dateFormat) }</Date>
            <Divider />
            <Segment basic>
              { event.description }
            </Segment>
          </Segment>
        </Popup.Content>
      </Popup>
    )
  }
}

export default CalendarEvent
