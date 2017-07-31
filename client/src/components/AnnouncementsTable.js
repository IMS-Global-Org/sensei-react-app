import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { indexAnnouncements } from '../actions/announcements'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'

// Custom Styled Components
const TableArea = styled(Segment)`
  height: 30vh;
  overflow: auto;
`

class AnnouncementsTable extends Component {
  state = { hasMore: false }

  /**
   * Load the initial data set and allow more records to be obtained
   */
  componentDidMount = () => {
    const { notices, dispatch } = this.props
    if( !notices || notices.data.length <= 0 ) {
      dispatch(indexAnnouncements())
      this.setState({ hasMore: true })
    }
  }

  displayTableRow = () => {
    const { notices } = this.props
    if( notices && notices.data.length > 0 ) {
      return notices.data.map( notice => {
        return (
          <Segment>{notice.title}</Segment>
        )
      })
    }
  }

  displayTableHeader = () => (
    <Segment>
      <Segment>
        Title
      </Segment>
      <Segment>
        Start Date
      </Segment>
      <Segment>
        End Date
      </Segment>
      <Segment>
        Registration
      </Segment>
    </Segment>
  )

  loadMore = ( page ) => {
    let { hasMore } = this.state
    let { notices: { pagination }, dispatch } = this.props
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexAnnouncements(page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  render() {
    return (
      <TableArea basic>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            loader={<div>Loading...</div>}
            useWindow={false} >
            <div>
              { this.displayTableRow() }
            </div>
          </InfiniteScroll>
      </TableArea>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { notices: state.announcements }
}

export default connect(mapStateToProps)(AnnouncementsTable)
