import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Label } from 'semantic-ui-react'
import ViewPostInfo from './ViewPostInfo'
import ViewPostVideos from './ViewPostVideos'
import ViewPostLinks from './ViewPostLinks'
import ViewPostPhotos from './ViewPostPhotos'
import styled from 'styled-components'

// Actions
import {
  showPostingsTable,
  clearActivePosting
} from '../../actions/postings'

// Custom Styled Components
const Seg = styled(Segment)`
  margin: 0 0.5rem !important;
`


class ViewPost extends Component {
  state = { postId: '' }

  componentDidMount = () => this.loadPost(this.props)
  componentWillReceiveProps = ( props ) => this.loadPost(props)
  componentWillUnmount = () => this.props.dispatch(clearActivePosting())
  loadPost = ( props ) => {
    const { dispatch, postId, post } = this.props
    const { postId: currId } = this.state
    if( !post || currId !== postId ) {
      dispatch(showPostingsTable(postId))
      this.setState({ postId })
    }
  }

  render = () => {
    const { post } = this.props
    return (
      <Grid celled='internally'>
        <Grid.Row columns={1}>
          <Grid.Column width={16}>
            <Seg basic>
              <Label ribbon>Post Information</Label>
              <ViewPostInfo
                post={post}
                closeModal={this.props.closeModal} />
            </Seg>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Seg basic>
              <Label ribbon>Videos</Label>
              <ViewPostVideos
                videos={post.videos}
                closeModal={this.props.closeModal} />
            </Seg>
          </Grid.Column>
          <Grid.Column width={8}>
            <Seg basic>
              <Label ribbon>Links</Label>
              <ViewPostLinks
                links={post.links}
                closeModal={this.props.closeModal} />
            </Seg>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Seg basic>
              <Label ribbon>Photos</Label>
              <ViewPostPhotos
                photos={post.photos}
                closeModal={this.props.closeModal} />
            </Seg>
          </Grid.Column>
          <Grid.Column width={8}></Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    post: state.tablePostings.activePosting,
  }
}

export default connect(mapStateToProps)(ViewPost)
