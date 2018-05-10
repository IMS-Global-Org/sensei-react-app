import React, { Component } from 'react'
import { List, Icon, Image } from 'semantic-ui-react'
import LabelField from '../helpers/LabelField'
import ListPara from '../helpers/ListPara'
import IconArea from '../helpers/IconArea'
import EditPostModal from './EditPostModal'


class ViewPostPhotos extends Component {
  defaults = { photoId: '', editor: '' }
  state = { ...this.defaults }

  editPhoto = ( photoId ) => this.setState({ photoId, editor: 'photo' })
  resetEditor = () => this.setState({ ...this.defaults })

  displayPhotos = () => {
    const { photos } = this.props
    if( photos && photos.length > 0 ) {
      return photos.map( photo => (
        <List.Item key={photo.id}>
          <IconArea>
            <Icon
              name='edit'
              onClick={()=>this.editPhoto(photo.id)} />
          </IconArea>
          <br />
          <LabelField bold>Title</LabelField>
          <ListPara>
            {photo.title}
          </ListPara>
          <List>
            <List.Item>
              <LabelField bold>Description</LabelField>
              {photo.description}
            </List.Item>
            <List.Item>
              <LabelField bold>Active</LabelField>
              {photo.active ? 'Yes' : 'No'}
            </List.Item>
            <List.Item>
              <LabelField bold>Viewable</LabelField>
              {photo.viewable ? 'Yes' : 'No'}
            </List.Item>
            <List.Item>
              <LabelField bold>File</LabelField>
              {photo.photo_file_name}
            </List.Item>
            <List.Item style={{margin: '1rem 0'}}>
              <Image src={photo.photo_url} size='small' />
            </List.Item>
          </List>
        </List.Item>
      ))
    }
  }

  render = () => {
    const { photoId, editor } = this.state
    return (
      <List divided relaxed>
        { this.displayPhotos() }
        { !this.props.removeAddIcon &&
        <List.Item>
          <IconArea>
            <Icon
              name='plus square outline'
              onClick={()=>this.editPhoto()} />
          </IconArea>
        </List.Item>
        }
        { editor &&
          <EditPostModal
            editor={editor}
            id={photoId}
            resetEditor={this.resetEditor} />
        }
      </List>
    )
  }
}

export default ViewPostPhotos
