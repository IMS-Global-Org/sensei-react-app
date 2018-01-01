import React, { Component } from 'react'
import { List, Icon } from 'semantic-ui-react'
import LabelField from '../helpers/LabelField'
import ListPara from '../helpers/ListPara'
import IconArea from '../helpers/IconArea'
import EditPostModal from './EditPostModal'


class ViewPostVideos extends Component {
  defaults = { videoId: '', editor: '' }
  state = { ...this.defaults }

  editVideo = ( videoId ) => this.setState({ videoId, editor: 'video' })
  resetEditor = () => this.setState({ ...this.defaults })

  displayVideos = () => {
    const { videos } = this.props
    if( videos && videos.length > 0 ) {
      return videos.map( video => (
        <List.Item key={video.id}>
          <IconArea>
            <Icon
              name='edit'
              onClick={()=>this.editVideo(video.id)} />
          </IconArea>
          <br />
          <LabelField bold>Title</LabelField>
          <ListPara>
            {video.title}
          </ListPara>
          <List>
            <List.Item>
              <LabelField bold>Identifier</LabelField>
              {video.identifier}
            </List.Item>
            <List.Item>
              <LabelField bold>Source</LabelField>
              {video.source}
            </List.Item>
            <List.Item>
              <LabelField bold>Notes</LabelField>
              <ListPara>{video.notes}</ListPara>
            </List.Item>
          </List>
        </List.Item>
      ))
    }
  }

  render = () => {
    const { videoId, editor } = this.state
    return (
      <List divided relaxed>
        { this.displayVideos() }
        { !this.props.removeAddIcon &&
        <List.Item>
          <IconArea>
            <Icon
              name='plus square outline'
              onClick={()=>this.editVideo()} />
          </IconArea>
        </List.Item>
        }
        { editor &&
          <EditPostModal
            editor={editor}
            id={videoId}
            resetEditor={this.resetEditor} />
        }
      </List>
    )
  }
}

export default ViewPostVideos
