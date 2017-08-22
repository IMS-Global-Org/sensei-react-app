import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Loader } from 'semantic-ui-react'
import {
  indexPostings, emptyReduxPostings,
} from '../actions/homePage.js'
import InfiniteScroll from 'react-infinite-scroller'
import Posting from './Posting'
import styled from 'styled-components'

// Custom Styled components
const Postings = styled(Segment)`
  height: 90vh !important;
  overflow: auto;
`

/**
 * @author Brennick Langston
 * @version 0.0.1
 */
class HomePage extends Component {
  state = { hasMore: false, per: 5 }

  /**
   * Load the postings that will be displayed on the homepage
   */
  componentDidMount = () => {
    let { postings, dispatch } = this.props
    let { per } = this.state
    dispatch(indexPostings(1,per))
    this.setState({ hasMore: true })
  }

  /**
   * Cleanup any residual postings that are left in redux
   */
  componentWilUnmount = () => {
    let { dispatch } = this.props
    dispatch(emptyReduxPostings())
  }

  /**
   * Loads the next set of homepage postings
   * @param {Integer} page - page number that is to be retrieved
   */
  loadMore = ( page ) => {
    let { hasMore, per } = this.state
    let { dispatch, postings: { pagination }} = this.props
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexPostings(page,per))
      } else {
        this.setState({
          hasMore: false
        })
      }
    }
  }

  /**
   * Creates the single posting components that will be displayed
   */
  displayPostings = () => {
    let { postings: { data } } = this.props
    if( data && data.length > 0 ) {
      return data.map( posting => {
        return ( <Posting key={posting.id} {...posting} /> )
      })
    }
  }

  render(){
    return (
      <Postings>
        <InfiniteScroll
          hasMore={this.state.hasMore}
          pageStart={0}
          loadMore={this.loadMore}
          loader={<Segment><Loader active /></Segment>}
          useWindow={false}>
          <div>
            { this.displayPostings() }
          </div>
        </InfiniteScroll>
      </Postings>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { postings: state.postings }
}

export default connect(mapStateToProps)(HomePage)
