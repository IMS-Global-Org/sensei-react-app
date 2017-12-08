import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import User from './User'

class NavBar extends Component {
  state={ activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  rightNavs = () => {
    const { dispatch, history } = this.props;
    const { activeItem } = this.state
    const user = new User()

    if(user.isLoggedIn()) {
      return(
        <Menu.Menu position='right'>
          { user.isAdmin() &&
            <Dropdown item text='Applications'>
              <Dropdown.Menu>
                <Menu.Item
                  name='notices'
                  as={ Link }
                  to='/announcements/edit'
                  active={activeItem === 'notices'}
                  onClick={this.handleItemClick} />
                <Menu.Item
                  name='postings'
                  as={ Link }
                  to='/postings'
                  active={activeItem === 'postings'}
                  onClick={this.handleItemClick} />
                <Menu.Item
                  name='Calendar Events'
                  as={ Link }
                  to='/calendar/events'
                  active={activeItem === 'Calendar Events'}
                  onClick={this.handleItemClick} />
                <Menu.Item
                  name='Program Tracker'
                  as={ Link }
                  to='/program/tracker'
                  active={activeItem === 'Program Tracker'}
                  onClick={this.handleItemClick} />
                <Menu.Item
                  name='students'
                  as={ Link }
                  to='/students'
                  active={activeItem === 'students'}
                  onClick={this.handleItemClick} />
                <Menu.Item
                  name='mailers'
                  as={ Link }
                  to='/mailers'
                  active={activeItem === 'mailers'}
                  onClick={this.handleItemClick} />
                <Menu.Item
                  name='contracts'
                  as={ Link }
                  to='/contracts'
                  active={activeItem === 'contracts'}
                  onClick={this.handleItemClick} />
                <Menu.Item
                  name='contractees'
                  as={ Link }
                  to='/contractees'
                  active={activeItem === 'contractees'}
                  onClick={this.handleItemClick} />
              </Dropdown.Menu>
            </Dropdown>
          }
          <Menu.Item
            name='settings'
            as={ Link }
            to='/settings'
            active={activeItem === 'settings'}
            onClick={this.handleItemClick} />
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={() => dispatch(handleLogout(history))} />
        </Menu.Menu>
      )
    } else {
      return(
        <Menu.Menu position='right'>
            <Menu.Item
              as={ Link }
              to='/register'
              name='register'
              active={activeItem === 'register'}
              onClick={this.handleItemClick} />
            <Menu.Item
              as={ Link }
              to='/login'
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick} />
        </Menu.Menu>
      )
    }
  }

  render() {
    const { activeItem } = this.state
    return (
      <Menu
        pointing
        secondary
        stackable
        style={{ backgroundColor: 'white'}} >
        <Menu.Item
          header
          color='red'
          name='sensei'
          as={ Link }
          to='/'
          active={activeItem === 'sensei'}
          onClick={this.handleItemClick} />
        <Menu.Item
          name='programs'
          as={ Link }
          to='/programs'
          active={activeItem === 'programs'}
          onClick={this.handleItemClick} />
        <Menu.Item
          as={ Link }
          to='/calendar'
          name='calendar'
          active={activeItem === 'calendar'}
          onClick={this.handleItemClick} />
        <Menu.Item
          as={ Link }
          to='/location'
          name='location'
          active={activeItem === 'location'}
          onClick={this.handleItemClick} />
        { this.rightNavs() }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(NavBar));
