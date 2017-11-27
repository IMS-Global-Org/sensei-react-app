import React, { Component } from 'react'
import { Segment, Label, Embed } from 'semantic-ui-react'

class HomePageVideos extends Component {

  displayVideos = () => {
    return this.props.videos.map( video => {
      return (
        <Segment key={video.id}>
          <Label attached='top'>{ video.title }</Label>
          <Embed url={video.source} />
        </Segment>
      )
    })
  }

  render() {
    return (
      <Segment basic>
        { this.displayVideos() }
      </Segment>
    )
  }
}

export default HomePageVideos
