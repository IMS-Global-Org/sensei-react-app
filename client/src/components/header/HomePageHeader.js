import React, { Component } from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import styled from 'styled-components'

// Images
import LeftForm from '../../images/form04.png'
import RightForm from '../../images/form03.png'

// Custom CSS
import '../../styles/header.css'

const Title = styled(Header)`
  font-family: "yozakura" !important;
  color: #fff !important;
  margin: 2rem 0 !important;
  font-size: 8rem !important;
  font-style: italic;
  letter-spacing: 1rem;
`
const SubTitle = styled(Header.Subheader)`
  color: #fff !important;
  font-size: 4rem !important;
  font-style: oblique;
  margin: 1rem 0 !important;
  letter-spacing: 0.5rem;
`

class HomePageHeader extends Component {
  render(){
    return (
      <Grid style={{ padding: '0.5rem 0.5rem' }}>
        <Grid.Row columns={3}>
          <Grid.Column
            width={1}
            textAlign='center'
            verticalAlign='middle'>
            <Image
              src={LeftForm}
              floated='right'
              size='tiny' />
          </Grid.Column>
          <Grid.Column width={14}>
            <Title
              as='h1'
              textAlign='center'>
              <Header.Content>
                Bobby Lawrence Karate
              </Header.Content>
              <SubTitle>
                Castle Valley, Utah
              </SubTitle>
            </Title>
          </Grid.Column>
          <Grid.Column
            width={1}
            textAlign='center'
            verticalAlign='middle'>
            <Image
              src={RightForm}
              floated='left'
              size='tiny' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
// <div className='title-image'></div>
// <div className='forms left'></div>
// <div className='forms right'></div>

export default HomePageHeader
