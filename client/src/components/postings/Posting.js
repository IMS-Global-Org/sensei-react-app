import React from 'react'
import { Segment, Header } from 'semantic-ui-react'
import HomePageVideos from '../homepages/HomePageVideos'
import HomePageLinks from '../homepages/HomePageLinks'

/**
 * TODO Arrange the layout of the information for the individual Postings
 * Layout the details of each posting accordingly
 * @param {Object} data - individual posting object; {id..., videos, links }
 */
const Posting = ({ id, title, message, videos, links }) => {
  return (
    <Segment>
      <Header as='h3' textAlign='center'>
        { title }
      </Header>
      <p>{ message }</p>
      <HomePageVideos videos={videos} />
      <HomePageLinks links={links} />
    </Segment>
  )
}

export default Posting
