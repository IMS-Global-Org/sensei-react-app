import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Button } from 'semantic-ui-react'
import VideoForm from './VideoForm'
import ViewPostVideos from './ViewPostVideos'

class VideoFormMulti extends Component {
  state={ videos: '' }

  componentDidMount = () => this.loadVideos(this.props)
  componentWillReceiveProps = (props) => this.loadVideos(props)
  loadVideos = ( props ) => {
    const { videos: newVideos } = props
    const { videos: oldVideos } = this.state
    if( typeof oldVideos !== 'object' || newVideos.length !== oldVideos.length ){
      this.setState({ videos: newVideos })
    }
  }

  moveToNextStep = () => this.props.stepCompleted(2)

  render = () => {
    const { videos } = this.state
    return (
      <Segment basic>
        { videos.length > 0 &&
          <Segment basic>
            <Label ribbon>Videos</Label>
            <ViewPostVideos videos={videos} removeAddIcon />
          </Segment>
        }
        <VideoForm
          {...this.props}
          postId={this.props.activePosting.id} />
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.moveToNextStep}>
              Go to Photos
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
    activePosting: state.tablePostings.activePosting,
  }
}

export default connect(mapStateToProps)(VideoFormMulti)
