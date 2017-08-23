import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

class ProgramTracker extends Component {
  state = { hasMore: false }

  render() {
    return (
      <Container>
        Program tracker
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { programs: state.programs }
}

export default connect(mapStateToProps)(ProgramTracker)
