import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import styled from 'styled-components'
import { indexTablePostings } from '../actions/postings'

// Custom Styled Components
const TableBody = styled(Table.Body)`
  height: 10vh !important;
  overflow: auto !important;
`

class PostingsTable extends Component {
  state={ hasMore: false }

  componentDidMount = () => {
    let { dispatch } = this.props
    dispatch(indexPostings())
    this.setState({ hasMore: true })
  }

  componentWillUnmount = () => {
    let { dispatch } = this.props
    dispatch(emptyReduxPostings())
  }

  displayTableRows = () => {
    let { postings: { data } } = this.props
    if( data && data.length > 0 ) {
      return data.map( posting => {
        return (
          <Table.Row>
            <Table.Cell>{posting.title}</Table.Cell>
            <Table.Cell>{posting.message}</Table.Cell>
            <Table.Cell>{posting.num_videos}</Table.Cell>
            <Table.Cell>{posting.num_links}</Table.Cell>
            <Table.Cell>{posting.date}</Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  loadMore = ( page ) => {
    let { hasMore } = this.state
    let { dispatch, pagination: { total_pages }} = this.props
    if( hasMore && total_pages ) {
      if( page <= total_pages ) {
        dispatch(indexPostings(page))
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Message</Table.HeaderCell>
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
            Controlls Area
          </Table.HeaderCell>
        </Table.Footer>
      </Table>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { postings: state.postings }
}

export default connect(mapStateToProps)(PostingsTable)
