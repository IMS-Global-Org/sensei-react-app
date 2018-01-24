import React, { Component } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { withRouter } from 'react-router-dom';
import User from './User'
import styled from 'styled-components'

const MenuItem = styled(Menu.Item)`
  font-family: 'yozakura' !important;
  font-size: 1.5rem !important;
  letter-spacing: 0.25rem !important;
  color: #FFF !important;
  padding-top: 0.25rem !important;
  padding-bottom: 0.5rem !important;
`


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
                <MenuItem
                  name='notices'
                  as={ Link }
                  to='/announcements/edit'
                  active={activeItem === 'notices'}
                  onClick={this.handleItemClick} />
                <MenuItem
                  name='postings'
                  as={ Link }
                  to='/postings'
                  active={activeItem === 'postings'}
                  onClick={this.handleItemClick} />
                <MenuItem
                  name='Calendar Events'
                  as={ Link }
                  to='/calendar/events'
                  active={activeItem === 'Calendar Events'}
                  onClick={this.handleItemClick} />
                <MenuItem
                  name='Program Tracker'
                  as={ Link }
                  to='/program/tracker'
                  active={activeItem === 'Program Tracker'}
                  onClick={this.handleItemClick} />
                <MenuItem
                  name='students'
                  as={ Link }
                  to='/students'
                  active={activeItem === 'students'}
                  onClick={this.handleItemClick} />
                <MenuItem
                  name='mailers'
                  as={ Link }
                  to='/mailers'
                  active={activeItem === 'mailers'}
                  onClick={this.handleItemClick} />
                <MenuItem
                  name='contracts'
                  as={ Link }
                  to='/contracts'
                  active={activeItem === 'contracts'}
                  onClick={this.handleItemClick} />
                <MenuItem
                  name='contractees'
                  as={ Link }
                  to='/contractees'
                  active={activeItem === 'contractees'}
                  onClick={this.handleItemClick} />
              </Dropdown.Menu>
            </Dropdown>
          }
          <MenuItem
            name='settings'
            as={ Link }
            to='/settings'
            active={activeItem === 'settings'}
            onClick={this.handleItemClick} />
          <MenuItem
            name='logout'
            active={activeItem === 'logout'}
            onClick={() => dispatch(handleLogout(history))} />
        </Menu.Menu>
      )
    } else {
      return(
        <Menu.Menu position='right'>
            <MenuItem
              as={ Link }
              to='/register'
              name='register'
              active={activeItem === 'register'}
              onClick={this.handleItemClick} />
            <MenuItem
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
        stackable>
        <MenuItem
          name='sensei'
          as={ Link }
          to='/'
          active={activeItem === 'sensei'}
          onClick={this.handleItemClick} />
        <MenuItem
          name='programs'
          as={ Link }
          to='/programs'
          active={activeItem === 'programs'}
          onClick={this.handleItemClick} />
        <MenuItem
          as={ Link }
          to='/calendar'
          name='calendar'
          active={activeItem === 'calendar'}
          onClick={this.handleItemClick} />
        <MenuItem
          as={ Link }
          to='/location'
          name='location'
          active={activeItem === 'location'}
          onClick={this.handleItemClick} />
        <MenuItem
          as={ Link }
          to='/blog'
          name='blog'
          active={activeItem === 'blog'}
          onClick={this.handleItemClick} />
        <MenuItem
          as={ Link }
          to='/news'
          name='news'
          active={activeItem === 'news'}
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
