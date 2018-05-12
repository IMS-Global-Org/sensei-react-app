import React, { Component } from 'react'
import { Segment, Label, Image, Header } from 'semantic-ui-react'
import styled from 'styled-components'

// Custom Styled Components
const Paragraph = styled.p`
  margin: 1rem 15%;
  textAlign: justified;
`

class HomePagePhotos extends Component {

  displayPhotos = () => {
    return this.props.photos.map( photo => {
      return (
        <Segment key={photo.id}>
          <Label attached='top'>{ photo.title }</Label>
          <Image src={photo.photo_url} centered fluid />
          <Paragraph>{ photo.description }</Paragraph>
        </Segment>
      )
    })
  }

  render() {
    return (
      <Segment basic>
        <Header as='h2' textAlign='center'>
          Related Photos
        </Header>
        { this.displayPhotos() }
      </Segment>
    )
  }
}

export default HomePagePhotos
