import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

// Custom CSS
import '../../styles/header.css'

// import WhiteDragonRight from '../images/dragon2.png'
// <Image size='mini' src={WhiteDragonRight} />

class Header extends Component {
  render(){
    return (
      <Grid style={{ padding: '0.5rem 0.5rem' }}>
        <Grid.Row columns={3}>
          <Grid.Column
            width={2}>
            <div className='forms left'></div>
          </Grid.Column>
          <Grid.Column width={12}>
            <div className='title-image'></div>
          </Grid.Column>
          <Grid.Column
            width={2}>
            <div className='forms right'></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Header
