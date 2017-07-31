import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Segment } from 'semantic-ui-react'
import AnnouncementForm from './AnnouncementForm'
import AnnouncementsTable from './AnnouncementsTable'

/**
 * @author Brennick Langston
 * @version 0.0.1
 * Displays a simple Announcement for editing purposes only
 */
class AnnouncementEdit extends Component {
  state={}

  componentDidMount = () => {}

  render() {
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <AnnouncementsTable />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <AnnouncementForm formType='edit' />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>Controls Area</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { notices: state.announcement || [] }
}

export default connect(mapStateToProps)(AnnouncementEdit)
