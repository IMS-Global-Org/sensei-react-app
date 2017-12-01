import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnnouncementCreate extends Component {
  state={}

  render = () => {
    return (
      <div>Announcement Create Component</div>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { notices: state.announcement || [] }
}

export default connect(mapStateToProps)(AnnouncementCreate)
