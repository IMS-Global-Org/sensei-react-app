import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import styled from 'styled-components'

// Custom Styled Components
const Dragons = styled.div`
  background-image: url('BorderDragons.png');
  background-repeat: repeat-y !important;
  background-position: 1% 0%;
  background-size: auto 25% !important;
  height: 100vh;
`

/**
 * Display the available programs and optional enrollment
 * @author Brennick Langston
 * @version 0.0.1
 */
class Programs extends Component {

  render() {
    return (
      <Dragons>
        <Container>
          Programs Listing
        </Container>
      </Dragons>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    programs: state.programs,
  }
}

export default connect(mapStateToProps)(Programs)
