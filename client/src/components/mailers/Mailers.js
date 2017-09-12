import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment } from 'semantic-ui-react'

class Mailers extends Component {

  render() {
    return (
      <Container>
        <Segment>
          Mailer Interface
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    mailers: state.data,
  }
}

export default connect(mapStateToProps)(Mailers)
