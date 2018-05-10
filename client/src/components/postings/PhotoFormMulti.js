import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Button } from 'semantic-ui-react'
import PhotoForm from './PhotoForm'
import ViewPostPhotos from './ViewPostPhotos'

class PhotoFormMulti extends Component {
  state={ photos: '' }

  componentDidMount = () => this.loadPhotos(this.props)
  componentWillReceiveProps = (props) => this.loadPhotos(props)
  loadPhotos = ( props ) => {
    const { photos: newPhotos } = props
    const { photos: oldPhotos } = this.state
    if( typeof oldPhotoos !== 'object' || newPhotos.length !== oldPhotos.length ){
      this.setState({ photos: newPhotos })
    }
  }

  moveToNextStep = () => this.props.stepCompleted(3)

  render = () => {
    const { photos } = this.state
    return (
      <Segment basic>
        { photos.length > 0 &&
          <Segment basic>
            <Label ribbon>Photos</Label>
            <ViewPostPhotos photos={photos} removeAddIcon />
          </Segment>
        }
        <PhotoForm
          {...this.props}
          postId={this.props.activePosting.id} />
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.moveToNextStep}>
              Go to Links
            </Button>
          </Button.Group>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    photos: state.tablePostings.activePosting.photos,
    activePosting: state.tablePostings.activePosting,
  }
}

export default connect(mapStateToProps)(PhotoFormMulti)
