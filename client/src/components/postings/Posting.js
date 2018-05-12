import React from 'react'
import { Segment, Header, Image } from 'semantic-ui-react'
import HomePageVideos from '../homepages/HomePageVideos'
import HomePageLinks from '../homepages/HomePageLinks'
import HomePagePhotos from '../homepages/HomePagePhotos'
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
const Posting = ({
  id, title, message, home_page_videos, home_page_links, home_page_photos,
}) => {
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
      { home_page_links.length > 0 &&
        <HomePageLinks links={home_page_links} />
      }
      { home_page_photos.length > 0 &&
        <HomePagePhotos photos={home_page_photos} />
      }
      { home_page_videos.length > 0 &&
        <HomePageVideos videos={home_page_videos} />
      }
    </Segment>
  )
}

export default Posting
