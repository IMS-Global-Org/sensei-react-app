import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

class ContactUsSentMessage extends Component {

  render = () => {
    return (
      <Grid divided>
        <Grid.Row columns={12}>
          <Grid.Column width={4}>one</Grid.Column>
          <Grid.Column width={4}>two</Grid.Column>
          <Grid.Column width={4}>three</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    email: state.contactus.data,
  }
}

export default connect(mapStateToProps)(ContactUsSentMessage)
