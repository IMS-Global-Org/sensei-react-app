import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import _ from 'lodash'

/**
 * Generates a MenuBar Paginator for displaying as part of other components
 * @author Brennick Langston
 * @version 0.0.1
 */
class Paginator extends Component {
  state = { activeItem: '' }

  /**
   * Initializes the page/Menu.Item that will be displayed as active
   */
  componentDidMount = () => {
    this.setState({ activeItem: this.props.currentPage })
  }

  /**
   * Generates the actual Menu.Items in proper display order
   */
  generatePages = () => {
    const { activeItem } = this.state
    const { loadMore } = this.props
    const pageNums = this.calculatePages()
    let components = []
    // place the left menu chevron
    components.push(this.leftChevron(pageNums.shift()))
    // insert the middle paginator menu items
    pageNums.forEach( pageNum => {
      components.push(
        <Menu.Item
          name={pageNum}
          active={activeItem === pageNum}
          onClick={loadMore} />
      )
    })
    // place the right menu chevron
    components.push(this.rightChevron(pageNums.shift()))
    // return the components for displaying
    return components
  }

  /**
   * Generates the left-hand most Menu.Item as a Chevron Icon
   */
  leftChevron = ( pageNum ) => {
    const { loadMore } = this.props
    const { activeItem } = this.state
    return (
      <Menu.Item
        icon
        name={pageNum}
        active={activeItem === pageNum}
        onClick={loadMore} >
        <Icon name='left chevron' />
      </Menu.Item>
    )
  }

  /**
   * Generates the right-hand most Menu.Item as a Chevron Icon
   */
  rightChevron = ( pageNum ) => {
    const { loadMore } = this.props
    const { activeItem } = this.state
    return (
      <Menu.Item
        icon
        name={pageNum}
        active={activeItem === pageNum}
        onClick={loadMore} >
        <Icon name='right chevron' />
      </Menu.Item>
    )
  }

  calculatePages = () => {
    const { currentPage, totalPages, numSeparators } = this.props
    // For mutating purposes in paginated menu
    const cp = parseInt(currentPage,10)
    const tp = parseInt(totalPages,10)
    // set the number of spanning page counters to display
    const numSep = numSeparators ? numSeparators : 6
    let pages = []
    if( tp - cp === 0 ) {
      // set the range of pages to display
      const range = tp
      // on the last page
      pages = _.range(tp - 6, range, 1).map( num => num.toString() )

      // pages remain to be viewed
    } else if( tp - cp < numSep ) {
      // set the range of pages to display
      const range = numSep
      const start = tp - numSep
      pages = _.range(start, range, 1).map( num => num.toString() )
    } else if( tp - cp <= 0 ) {
      // no pages left to view
    }
    // turn into a range of strings
    let pages = _.range(cp - 1, range, 1).map( num => num.toString() )
    return pages
  }


  render() {
    return (
      <Menu pagination size='mini' floated='right'>
        { this.generatePages() }
      </Menu>
    )
  }
}

export default Paginator
