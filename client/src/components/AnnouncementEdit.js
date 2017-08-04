import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Segment } from 'semantic-ui-react'
import AnnouncementForm from './AnnouncementForm'
import AnnouncementsTable from './AnnouncementsTable'

/**
 * @author Brennick Langston
 * @version 0.0.1
 * Displays a simple Announcement for editing purposes only
 */
class AnnouncementEdit extends Component {
  state={ activeAnnouncement: null }

  componentDidMount = () => {}

  handleActiveAnnouncement = ( activeAnnouncement ) => {
    this.setState({
      activeAnnouncement: activeAnnouncement
    })
  }

  clearAnnouncement = () => {
    this.setState({
      activeAnnouncement: null
    })
  }

  render() {
    const { activeAnnouncement } = this.state
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <AnnouncementsTable
                handleActiveAnnouncement={this.handleActiveAnnouncement} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>
                <AnnouncementForm
                  activeAnnouncement={activeAnnouncement}
                  clearAnnouncement={this.clearAnnouncement}
                  formType={ activeAnnouncement ? 'edit' : 'create' } />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Segment>Controls Area</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    notices: state.announcement || [],
    activeAnnouncement: state.activeAnnouncement || {},
  }
}

export default connect(mapStateToProps)(AnnouncementEdit)
