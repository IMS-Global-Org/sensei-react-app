import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Button } from 'semantic-ui-react'
import LinkForm from './LinkForm'
import ViewPostLinks from './ViewPostLinks'

class LinkFormMulti extends Component {
  state = { links: '' }

  componentDidMount = () => this.loadLinks(this.props)
  componentWillReceiveProps = (props) => this.loadLinks(props)
  loadLinks = ( props ) => {
    const { links: newLinks } = props
    const { links: oldLinks } = this.state
    if( typeof oldLinks !== 'object' || newLinks.length !== oldLinks.length ) {
      this.setState({ links: newLinks })
    }
  }

  moveToNextStep = () => this.props.stepCompleted(3)

  render = () => {
    const { links } = this.state
    return (
      <Segment basic>
        { links.length > 0 &&
          <Segment basic>
            <Label ribbon>Links</Label>
            <ViewPostLinks links={links} removeAddIcon />
          </Segment>
        }
        <LinkForm
          {...this.props}
          postId={this.props.activePosting.id} />
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
    activePosting: state.tablePostings.activePosting,
  }
}

export default connect(mapStateToProps)(LinkFormMulti)
