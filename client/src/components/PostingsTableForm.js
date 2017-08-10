import React, { Component } from 'react'
import { Segment, Form, Button, Divider } from 'semantic-ui-react'

class PostingsTableForm extends Component {
  defaults = { title: '', message: '', videos: [], links: [] }
  defaultVideo = { title: '', identifier: '', source: '', notes: '' }
  defaultLink = { title: '', url: '', abbreviation: '', description: '' }
  state = { ...this.defaults }

  /**
   * Set the Initial state for all form components
   */
  componentDidMount = () => {
    const { activePosting } = this.props
    if( activePosting ){
      // load active settings
      this.setState({ ...activePosting })
    } else {
      // set defaults
      this.setState({
        videos: [
          { ...this.defaultVideo }
        ],
        links: [
          { ...this.defaultLink }
        ]
      })
    }
  }

  componentWillReceiveProps = ( nextProps ) => {
    if( nextProps.activePosting )
      this.setState({ ...nextProps.activePosting })
  }

  componentDidUpdate = () => {
    this.props.setStateCallback(this.stateCallback)
  }

  stateCallback = () => {
    return this.state
  }

  /**
   * Handler for Main Form component changes/updates
   * @param {Object} event - form event object
   */
  handleChange = ( event ) => {
    let { target: { id, value } } = event
    this.setState({ [id]: value })
  }

  /**
   * Creates and displays all the video subform sets
   */
  displayVideoFields = () => {
    const { videos } = this.state
    if( videos && videos.length > 0 ) {
      return videos.map( (video,index) => {
        return (
          <Segment basic key={index}>
            <Button
              label='Remove Video'
              size='mini'
              icon='minus'
              floated='right'
              onClick={ () => this.removeSetField(index,'videos') } />
            <Form.Input
              label='Title'
              id='title'
              value={video.title}
              required
              onChange={ (e) => this.handleSetChange(e,index,'videos') } />
            <Form.Input
              label='Identifier'
              id='identifier'
              value={video.identifier}
              required
              onChange={ (e) => this.handleSetChange(e,index,'videos') } />
            <Form.Input
              label='Source'
              id='source'
              value={video.source}
              required
              onChange={ (e) => this.handleSetChange(e,index,'videos') } />
            <Form.Input
              label='Notes'
              id='notes'
              value={video.notes}
              onChange={ (e) => this.handleSetChange(e,index,'videos') } />
          </Segment>
        )
      })
    }
  }

  /**
   * Creates and displays all the video subform sets
   */
  displayLinksFields = () => {
    const { links } = this.state
    if( links && links.length > 0 ) {
      return links.map( (link,index) => {
        return (
          <Segment basic key={index}>
            <Button
              label='Remove Link'
              size='mini'
              icon='minus'
              floated='right'
              onClick={ () => this.removeSetField(index,'links') } />
            <Form.Input
              label='Title'
              id='title'
              value={link.title}
              required
              onChange={ (e) => this.handleSetChange(e,index,'links') } />
            <Form.Input
              label='URL'
              id='url'
              value={link.url}
              required
              onChange={ (e) => this.handleSetChange(e,index,'links') } />
            <Form.Input
              label='Abbreviation'
              id='abbreviation'
              value={link.abbreviation}
              onChange={ (e) => this.handleSetChange(e,index,'links') } />
            <Form.Input
              label='Description'
              id='description'
              value={link.description}
              required
              onChange={ (e) => this.handleSetChange(e,index,'links') } />
          </Segment>
        )
      })
    }
  }

  /**
   * Update the input field for the individual set fields
   * @param {Object} event - event object for form element
   * @param {Integer} index - index of the video subform group
   * @param {String} set - name of the set where changes will be updated
   */
  handleSetChange = ( event, index, set ) => {
    const { target: { id, value } } = event
    let comp = this.state[set][index]
    comp[id] = value
    this.setState({
      [set]:[
        ...this.state[set].slice(0,index),
        comp,
        ...this.state[set].slice(index + 1),
      ]
    })
  }

  defaultSetName = ( set ) => {
    // Create dynamic name of the dataset to be created by default
    const capitalized = set[0].toUpperCase() + set.substring(1,set.length-1)
    const setName = `default${capitalized}`
    return setName
  }

  /**
   * Adds a new set of Video subform elements to the existing set
   * @param {String} set - name of the set subform will be added to
   */
  addSetField = ( set ) => {
    const setName = this.defaultSetName(set)
    // add the new set to the existing set
    this.setState({
      [set]: [
        ...this.state[set],
        { ...this[setName] },
      ],
    })
  }

  /**
   * Removes a single video from the post
   * @param {Integer} index - set number to remove
   * @param {String} set - name of the set subform will be removed from
   */
  removeSetField = ( index, set ) => {
    this.setState({
      [set]: [
        ...this.state[set].slice(0,index),
        ...this.state[set].slice(index +1),
      ]
    })
  }

  /**
   * Removes all the videos from the post
   * @param {String} set - name of the set to work with
   */
  clearAllFromSet = ( set ) => {
    const setName = this.defaultSetName(set)
    this.setState({
      [set]: [
        { ...this[setName] }
      ]
    })
  }

  render() {
    const { title, message } = this.state
    return (
      <Form>
        <Form.Input
          label='Title'
          id='title'
          value={title}
          onChange={this.handleChange} />
        <Form.Input
          label='Message'
          id='message'
          value={message}
          onChange={this.handleChange} />
        <Segment>
          <Divider horizontal>Videos</Divider>
          { this.displayVideoFields() }
          <Segment basic clearing>
            <Button.Group size='mini' floated='right'>
              <Button
                label='Add Video'
                icon='plus'
                onClick={(e) => this.addSetField('videos')} />
              <Button
                label='Clear All Videos'
                icon='trash'
                onClick={(e) => this.clearAllFromSet('videos')} />
            </Button.Group>
          </Segment>
        </Segment>
        <Segment>
          <Divider horizontal>Links</Divider>
          { this.displayLinksFields() }
          <Divider />
          <Segment basic clearing>
            <Button.Group size='mini' floated='right'>
              <Button
                label='Add Link'
                icon='plus'
                onClick={(e) => this.addSetField('links')} />
              <Button
                label='Clear All Links'
                icon='trash'
                onClick={(e) => this.clearAllFromSet('links')} />
            </Button.Group>
          </Segment>
        </Segment>
      </Form>
    )
  }
}

export default PostingsTableForm
