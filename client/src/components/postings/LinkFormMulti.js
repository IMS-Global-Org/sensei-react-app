import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Button } from 'semantic-ui-react'
import LinkForm from './VideoForm'
import ViewPostLinks from './ViewPostVideos'

class LinkFormMulti extends Component {
  state = { links: [] }

  moveToNextStep = () => this.props.stepCompleted(3)

  render = () => {
    const { links = [] } = this.props
    return (
      <Segment basic>
        { links.length > 0 &&
          <Segment raised>
            <Label ribbon>Links</Label>
            <ViewPostLinks links={links} />
          </Segment>
        }
        <LinkForm {...this.props} />
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.moveToNextStep}>
              Finished
            </Button>
          </Button.Group>
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    links: state.tablePostings.activePosting.links,
  }
}

export default connect(mapStateToProps)(LinkFormMulti)
