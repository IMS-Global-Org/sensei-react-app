import React, { Component } from 'react'
import { Grid, Header, Image } from 'semantic-ui-react'
import styled from 'styled-components'

// Images
// import LeftForm from '../../images/form04.png'
import RightForm from '../../images/BLK-Logo-8f0222.png'
import BLK_DOJO from '../../images/BLK-Logo-8f0222-L.png'

// Custom CSS
import '../../styles/header.css'

const Title = styled(Header)`
  font-family: "yozakura" !important;
  color: #fff !important;
  font-size: 5rem !important;
  margin: 0.5rem 0 !important;
  letter-spacing: 1.5rem;
`
const SubTitle = styled(Header.Subheader)`
  color: #fff !important;
  font-size: 2rem !important;
  font-style: oblique;
  margin: 0.3rem 0 !important;
  letter-spacing: 0.5rem;
`

class HomePageHeader extends Component {
  render(){
    return (
      <Grid style={{ padding: '0.5rem 0.5rem' }}>
        <Grid.Row columns={3}>
          <Grid.Column
            width={2}
            textAlign='center'
            verticalAlign='middle'>
            <Image
              src={BLK_DOJO} />
          </Grid.Column>
          <Grid.Column width={12}>
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
            width={2}
            textAlign='center'
            verticalAlign='middle'>
            <Image
              src={RightForm} />
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
