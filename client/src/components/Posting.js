import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import HomePageVideos from './HomePageVideos'
import HomePageLinks from './HomePageLinks'

/**
 * TODO Arrange the layout of the information for the individual Postings
 * Layout the details of each posting accordingly
 * @param {Object} data - individual posting object; { posting, videos, links }
 */
const Posting = ({ data: { posting, videos, links } }) => {
  return (
    <Segment>
      <Header as='h3' textAlign='center'>
        { posting.title }
      </Header>
      <p>{ posting.message }</p>
      <HomePageVideos videos={videos} />
      <HomePageLinks links={links} />
    </Segment>
  )
}

export default Posting
