import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'

// import WhiteDragonRight from '../images/dragon2.png'
// <Image size='mini' src={WhiteDragonRight} />

// Custom Components
const WhiteDragonLeft = styled.div`
  background-image: url('dragon1.png') !important;
  background-repeat: no-repeat;
  background-position: 1% 0;
  background-size: auto 100px;
  height: 100px;
`
const WhiteDragonRight = styled.div`
  background-image: url('dragon2.png') !important;
  background-repeat: no-repeat;
  background-position: 99% 0;
  background-size: auto 100px;
  height: 100px;
`

class Header extends Component {
  render(){
    return (
      <Grid style={{ padding: '0.5rem 0.5rem' }}>
        <Grid.Row columns={3}>
          <Grid.Column width={1} textAlign='center'>
            <WhiteDragonLeft />
          </Grid.Column>
          <Grid.Column width={14}></Grid.Column>
          <Grid.Column width={1} textAlign='center'>
            <WhiteDragonRight />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Header
