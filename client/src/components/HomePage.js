import React, { Component } from 'react'
import { Segment, Embed } from 'semantic-ui-react'

class HomePage extends Component {

  render(){
    return (
      <Segment>
        <Embed
          id='6fbPmudJgKU'
          aspectRatio='4:3'
          source='youtube' />
      </Segment>
    )
  }
}

export default HomePage
