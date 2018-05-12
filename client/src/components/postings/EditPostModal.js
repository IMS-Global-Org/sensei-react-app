import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'

// Editing Components
import PostForm from './PostForm'
import VideoForm from './VideoForm'
import LinkForm from './LinkForm'
import PhotoForm from './PhotoForm'


class EditPostModal extends Component {
  state = { openModal: true, resetModal: false }
  editors = {
    post: PostForm,
    video: VideoForm,
    link: LinkForm,
    photo: PhotoForm,
  }

  onClose = ( closeParent = false ) => {
    this.setState({ openModal: false },
      this.props.resetEditor())
    if( typeof(closeParent) === 'boolean' && closeParent === true ) {
      this.props.closeModal()
    }
  }

  dataFactory = ( editor ) => {
    const { post, id } = this.props
    switch( editor ) {
      case 'post':
        if( post && post.title ) {
          const newPost = { ...post }
          delete newPost.videos
          delete newPost.links
          return newPost
        }
        break;
      case 'video':
        if( id && post.videos ) {
          return post.videos.find( v => v.id === id )
        }
        break;
      case 'link':
        if( id && post.links ) {
          return post.links.find( l => l.id === id )
        }
        break;
      case 'photo':
        if( id && post.photos ) {
          return post.photos.find( p => p.id === id )
        }
        break;
      default:
        return {}
    }
  }

  render = () => {
    const { editor } = this.props
    const Editor = this.editors[editor]
    const data = this.dataFactory(editor)
    const { openModal } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.onClose}>
        <Modal.Content>
          <Modal.Description>
            <Editor
              data={data}
              closeModal={this.onClose} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.onClose}>
              Back to Details
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    post: state.tablePostings.activePosting,
  }
}

export default connect(mapStateToProps)(EditPostModal)
