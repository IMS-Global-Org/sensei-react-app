import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import PostingsTable from './PostingsTable'

/**
 * Component that provides a way to add, edit, and delete homepage postings
 * @author Brennick Langston
 * @version 0.0.1
 */
class HomePagePostings extends Component {
  state = { activePosting: null }

  // TODO show the selected posting in a modal
  // TODO give a list of postings to sort through
  render() {
    return (
      <Segment>
        <PostingsTable />
      </Segment>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { postings: state.postings }
}

export default connect(mapStateToProps)(HomePagePostings)
