import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Button } from 'semantic-ui-react'
import VideoForm from './VideoForm'
import ViewPostVideos from './ViewPostVideos'

class VideoFormMulti extends Component {
  state = { videos: [] }

  moveToNextStep = () => this.props.stepCompleted(2)

  render = () => {
    const { videos = [] } = this.state
    return (
      <Segment basic>
        { videos.length > 0 &&
          <Segment raised>
            <Label ribbon>Videos</Label>
            <ViewPostVideos videos={videos} />
          </Segment>
        }
        <VideoForm {...this.props} />
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.moveToNextStep}>
              Go to Link
            </Button>
          </Button.Group>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    videos: state.tablePostings.activePosting.videos,
  }
}

export default connect(mapStateToProps)(VideoFormMulti)
