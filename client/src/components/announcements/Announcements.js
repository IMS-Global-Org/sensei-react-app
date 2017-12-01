import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import Announcement from './Announcement'
import {
  indexAnnouncements, emptyReduxAnnouncements
} from '../../actions/announcements.js'
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
  // NOTE 'hasMore' must be set to false until the initial data has loaded.
  //      Eliminates pre-mature loading of data and unwanted race conditions
  state = { hasMore: false }

  /**
   * Initialize the working series of announcements
   */
  componentDidMount = () => {
   let { dispatch } = this.props
   // NOTE load the initial data that will be displayed in the component
   dispatch(indexAnnouncements())
   // NOTE Once initial data has loaded, set the scroll to having more elements
   this.setState({ hasMore: true })
  }

  /**
  * Clears the announcements redux store when unmounted
  */
  componentWillUnmount = () => {
    let { dispatch } = this.props
    dispatch(emptyReduxAnnouncements())
  }

  /**
   * Presents the individual notices in a single group
   */
  displayAnnouncements = () => {
    let { notices } = this.props
    // NOTE load only when 'data' exists, not just the empty object/container
    if( notices && notices.length > 0 ) {
      return notices.map( notice => {
        // show presentation component
        return ( <Announcement key={notice.id} data={notice} /> )
      })
    }
  }

  /**
   * Loader for older out of date announcements
   * @param {Integer} page - the next page of announcements to load
   */
  loadMore = ( page ) => {
    let { pagination, dispatch } = this.props
    let { hasMore } = this.state
    // NOTE These two conditions must be meet to load more items
    //      1) hasMore must be true, only after the initial loading
    //      2) pagination info must be available to determining if more pages
    //         can actually be loaded. 'total_pages' has to be set so comparison
    //         will indicate if additional pages can be loaded.
    if( hasMore && pagination.total_pages ){
      if( page <= pagination.total_pages ){
        dispatch(indexAnnouncements(page))
      } else {
        // NOTE set 'hasMore' to false only if there are no more pages to load
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
          loader={<Segment><Loader active /></Segment>}
          useWindow={false} >
          {/* additional 'div' elements are required by InfiniteScroll */}
          <div>
            { this.displayAnnouncements() }
          </div>
        </InfiniteScroll>
      </AnnouncementsArea>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    notices: state.announcements.data,
    pagination: state.announcements.pagination,
  }
}

export default connect(mapStateToProps)(Announcements)
