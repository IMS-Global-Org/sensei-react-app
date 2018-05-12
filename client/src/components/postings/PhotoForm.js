import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Input, Button, List } from 'semantic-ui-react'
import FileBase64 from 'react-file-base64'

// Actions
import {
  updatePhoto,
  createPhoto,
  deletePhoto,
} from '../../actions/postings'


class PhotoForm extends Component {
  defaults = {
    id: '', title: '', description: '',
    photo: '',
    active: 0, viewable: 0,
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadPhoto(this.props)
  componentWillReceiveProps = ( props ) => this.loadPhoto(props)
  loadPhoto = ( props ) => {
    const { data: photo } = props
    const { id } = this.state
    if( photo && photo.id !== id ) {
      this.setState({
        id: photo.id,
        title: photo.title,
        description: photo.description,
        photo: photo.photo_file_name,
        active: photo.active,
        viewable: photo.viewable,
      })
    }
  }

  onInputChange = ({target: {id,value}}) => this.setState({ [id]: value })
  onClear = () => this.setState({ ...this.defaults })
  onDelete = () => {
    this.props.dispatch(deletePhoto(this.state.id))
    this.props.closeModal()
  }
  onFileChange = (file) => {
    this.setState({ photo: file })
  }
  onCheckboxChange = (e,{id,checked}) => this.setState({ [id]: checked ? 1 : 0 })
  onSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, closeModal, postId } = this.props
    const form = this.state
    form.base_photo = form.photo
    delete form.photo
    if( form.id ) {
      dispatch(updatePhoto(form))
    } else {
      dispatch(createPhoto(postId, form))
    }
    if( closeModal ) { closeModal() }
    this.onClear()
  }

  render = () => {
    const {
      id, title, description,
      photo,
      active, viewable,
    } = this.state
    return (
      <Form>
        <Form.Input
          label='Title'
          id='title'
          value={title}
          required
          onChange={this.onInputChange} />
        <Form.TextArea
          label='Description'
          id='description'
          value={description}
          onChange={this.onInputChange} />
        <Form.Field required>
          <label>Photo</label>
          <List>
            <List.Item>
              {typeof photo == 'string' && photo}
            </List.Item>
          </List>
          <FileBase64
            multiple={false}
            onDone={this.onFileChange.bind(this)} />
        </Form.Field>
        <Form.Checkbox
          label='Active'
          id='active'
          checked={active ? true : false}
          onChange={this.onCheckboxChange} />
        <Form.Checkbox
          label='Viewable'
          id='viewable'
          checked={viewable ? true : false}
          onChange={this.onCheckboxChange} />
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='submit'
              onClick={this.onSubmit}>
              { id ? 'Update' : 'Create' }
            </Button>
            <Button.Or />
            <Button
              type='button'
              disabled={ title ? false : true }
              onClick={this.onClear}>
              Clear Form
            </Button>
            <Button.Or />
            <Button
              type='button'
              disabled={ id ? false : true }
              onClick={this.onDelete}>
              Delete
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

export default connect()(PhotoForm)
