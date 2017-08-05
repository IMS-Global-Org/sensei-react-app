import React from 'react'
import { Segment } from 'semantic-ui-react'

// TODO Arrange the layout of the information for the individual Postings
const Posting = ({ data }) => (
  <Segment>
    { data.title }
  </Segment>
)

export default Posting
