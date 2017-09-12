import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Segment } from 'semantic-ui-react'

// Actions
import {
  indexMailers,
} from '../../actions/mailers'

class Mailers extends Component {

  componentDidMount = () => {
    const { dispatch, mailers } = this.props
    if( !mailers || mailers.length <= 0 ) {
      dispatch(indexMailers())
    }
  }

  mailersCount = () => {
    const { mailers } = this.props
    if( mailers && mailers.length > 0 ) {
      return <Segment basic>{mailers.length}</Segment>
    }
  }

  render() {
    return (
      <Container>
        <Segment>
          Mailer Interface
          <br />Number of Mailers:&nbsp;
          { this.mailersCount() }
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
