import React, { Component } from 'react'
import { Segment, Header, Icon, List } from 'semantic-ui-react'

// FIXME add description to the database table and include in the layout
class HomePageLinks extends Component {

  displayLinks = () => {
    return this.props.links.map( link => {
      return (
        <List.Item key={link.id}>
          <List.Icon name='linkify' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header
              as='a'
              to={link.url}>
              { link.title }
            </List.Header>
            <List.Description>
              { link.description }
            </List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    return (
      <Segment basic>
        <Header as='h2' icon textAlign='center'>
          <Icon name='world' />
          More Reading
          <Header.Subheader>
            Continue to Progress and Learn
          </Header.Subheader>
        </Header>
        <List divided relaxed>
          { this.displayLinks() }
        </List>
      </Segment>
    )
  }
}

export default HomePageLinks
