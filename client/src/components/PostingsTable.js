import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Table, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import {
  indexPostingsTable,
  emptyReduxPostings
} from '../actions/postings'
import moment from 'moment'
import Paginator from './Paginator'
import PostingsTableModal from './PostingsTableModal'

// Custom Styled Components
const TableBody = styled(Table.Body)`
  height: 200px !important;
  overflow-y: scroll !important;
`

class PostingsTable extends Component {
  state = { hasMore: false, activeItem: null, open: false }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(indexPostingsTable())
    this.setState({ hasMore: true })
  }

  componentWillUnmount = () => {
    let { dispatch } = this.props
    dispatch(emptyReduxPostings())
  }

  dateFormat = "dddd, MMMM Do YYYY, h:mm:ss a"

  displayTableRows = () => {
    let { postings: { data } } = this.props
    if( data && data.length > 0 ) {
      return data.map( posting => {
        return (
          <Table.Row
            key={posting.id}
            id={posting.id}
            onClick={(e) => this.displayModalForm(e,posting.id)}>
            <Table.Cell>{posting.title}</Table.Cell>
            <Table.Cell>{posting.videos}</Table.Cell>
            <Table.Cell>{posting.links}</Table.Cell>
            <Table.Cell>
              {moment.utc(posting.created_at).format(this.dateFormat)}
            </Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  displayModalForm = ( event, postingId ) => {
    // FIXME reset the form for repeated selection of same posting is displayed
    this.setState({
      open: true,
      activeItem: postingId,
    })
  }

  loadMore = ( page ) => {
    let { hasMore } = this.state
    let { dispatch, postings: { pagination } } = this.props
    if( hasMore && pagination.total_pages ) {
      if( page <= pagination.total_pages ) {
        dispatch(indexPostingsTable(page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  render() {
    const { open, activeItem } = this.state
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell># of Videos</Table.HeaderCell>
            <Table.HeaderCell># of Links</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          { this.displayTableRows() }
        </TableBody>
        <Table.Footer>
          <Table.HeaderCell colSpan={5}>
            <PostingsTableModal
              open={open}
              activePosting={activeItem}
              formType={ activeItem ? 'edit' : 'new' } />
            <Paginator
              pagination={this.props.postings.pagination}
              loadMore={this.loadMore}
              size='mini' />
          </Table.HeaderCell>
        </Table.Footer>
      </Table>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { postings: state.tablePostings }
}

export default connect(mapStateToProps)(PostingsTable)