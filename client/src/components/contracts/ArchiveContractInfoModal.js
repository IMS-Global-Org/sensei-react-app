import React, { Component } from 'react'
import { connect } from 'react-redux'

class ArchiveContractInfoModal extends Component {
  state = {}

  render = () => {
    return (
      <div>ArchiveContractInfoModal</div>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {}
}

export default connect(mapStateToProps)(ArchiveContractInfoModal)
