import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import styled from 'styled-components'
import Announcement from './Announcement'
import { indexAnnouncements } from '../actions/announcements.js'
import InfiniteScroll from 'react-infinite-scroller'

// Custom Styled Components
const AnnouncementsArea = styled(Segment)`
  overflow: auto;
  height: 600px;
`

/**
 * Presentation of individual announcements
 * @author B. Langston
 * @version 0.0.1
 */
class Announcements extends Component {
  state = { hasMore: false }

  /**
   * Initialize the working series of announcements
   */
   componentDidMount = () => {
     let { dispatch } = this.props
     dispatch(indexAnnouncements())
     this.setState({ hasMore: true })
   }

  /**
   * Presents the individual notices in a single group
   */
  displayAnnouncements = () => {
    let { notices: { data } } = this.props
    if( data && data.length > 0 ) {
      return data.map( notice => {
        return ( <Announcement key={notice.id} data={notice} /> )
      })
    }
  }

  /**
   * Loader for older out of date announcements
   * @param {Integer} page - the next page of announcements to load
   */
  loadMore = ( page ) => {
    let { notices: { pagination }, dispatch } = this.props
    let { hasMore } = this.state
    if( hasMore && pagination.total_pages ){
      if( page <= pagination.total_pages ){
        dispatch(indexAnnouncements(page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  /**
   * Renders the list of announcements
   */
  render() {
    return (
      <AnnouncementsArea>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={this.state.hasMore}
          loader={<div>Loading...</div>}
          useWindow={false} >
          <div>
            { this.displayAnnouncements() }
          </div>
        </InfiniteScroll>
      </AnnouncementsArea>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { notices: state.announcements }
}

export default connect(mapStateToProps)(Announcements)
