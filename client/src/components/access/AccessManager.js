import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import ClientList from './ClientList'

class AccessManager extends Component {
  defaults = {}
  state = { ...this.defaults }

  render = () => {
    return (
      <Container>
        <div>SearchForm</div>
        <ClientList />
      </Container>
    )
  }
}

export default connect()(AccessManager)
