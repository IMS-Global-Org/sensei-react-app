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
    // store the right menu chevron
    const right = this.rightChevron(pageNums.pop())
    // insert the middle paginator menu items
    pageNums.forEach( pageNum => {
      components.push(
        <Menu.Item
          key={pageNum}
          name={pageNum}
          active={activeItem === pageNum}
          onClick={this.loadPage} />
      )
    })
    // set the right chevron as the last available page
    components.push(right)
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
        key={pageNum}
        icon
        name={pageNum}
        active={activeItem === pageNum}
        onClick={this.loadPage} >
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
        key={pageNum}
        icon
        name={pageNum}
        active={activeItem === pageNum}
        onClick={this.loadPage} >
        <Icon name='right chevron' />
      </Menu.Item>
    )
  }

  /**
   * Determine which pages will be placed in the paginator menu as items
   */
  calculatePages = () => {
    const { pagination: {current_page, total_pages} } = this.props
    // For mutating purposes in paginated menu
    const cp = parseInt(current_page,10)
    const tp = parseInt(total_pages,10)
    // set the page number range to display
    let pages = this.positions(cp,tp).map( pageNum => pageNum.toString())
    return pages
  }

  /**
   * Modified Algorithm from:
   * GitHubGist: https://gist.github.com/keon/5380f81393ad98ec19e6.js
   */
  positions = (current, total) => {
  	const pageLimit = 7;
  	let upperLimit, lowerLimit;
  	lowerLimit = upperLimit = Math.min(current, total);

  	for (let b = 1; b < pageLimit && b < total;) {
  	    if (lowerLimit > 1 ) {
  	        lowerLimit--; b++;
  	    }
  	    if (b < pageLimit && upperLimit < total) {
  	        upperLimit++; b++;
  	    }
  	}

    return _.range(lowerLimit,upperLimit+1,1)
  }

  /**
   * Helper for loading More pages
   * @param {Object} e - event object
   * @param {Object} data - event data object
   */
  loadPage = ( e, data ) => {
    this.setState({
      activeItem: data.name
    }, () => this.props.loadMore( e, data ))
  }

  /**
   * Renders the generated pagination menu
   */
  render() {
    return (
      <Menu pagination size='mini' floated='right'>
        { this.generatePages() }
      </Menu>
    )
  }
}

export default Paginator
