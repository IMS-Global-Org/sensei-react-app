import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnnouncementCreate extends Component {
  state={}
}

const mapStateToProps = ( state ) => {
  return { notices: state.announcement || [] }
}

export default AnnouncementCreate
