import React from 'react'
import { Segment, Header, Image } from 'semantic-ui-react'
import HomePageVideos from '../homepages/HomePageVideos'
import HomePageLinks from '../homepages/HomePageLinks'
import styled from 'styled-components'

import ThrowingStar from '../../images/throwing_star.jpeg'

// Custom Styled Components
const Title = styled(Header)`
  font-family: 'yozakura' !important;
  font-size: 5rem !important;
  font-weight: bolder !important;
  letter-spacing: 0.25rem;
`

/**
 * TODO Arrange the layout of the information for the individual Postings
 * Layout the details of each posting accordingly
 * @param {Object} data - individual posting object; {id..., videos, links }
 */
const Posting = ({ id, title, message, home_page_videos, home_page_links }) => {
  return (
    <Segment>
      <Segment basic textAlign='center'>
        <Image
          size='small'
          src={ThrowingStar}
          verticalAlign='middle' />
      </Segment>
      <Title as='h1' textAlign='center'>
        { title }
      </Title>
      <p>{ message }</p>
      <HomePageVideos videos={home_page_videos} />
      <HomePageLinks links={home_page_links} />
    </Segment>
  )
}

export default Posting
