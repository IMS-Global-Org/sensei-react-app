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
  font-size: 1.25rem !important;
  letter-spacing: 0.25rem !important;
  color: #FFF !important;
  padding-top: 0.25rem !important;
`
const DropDown = styled(Dropdown)`
  font-family: 'yozakura' !important;
  font-size: 1.25rem !important;
  letter-spacing: 0.25rem !important;
  color: #FFF !important;
`
const DropDownMenu = styled(Dropdown.Menu)`
  background-color: #a6a6a6 !important;
  border: 1px solid #FFF !important;
`
const Content = styled.span`
  color: #FFFFFF !important;
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
            <DropDown item text='Applications'>
              <DropDownMenu>
                <Dropdown.Item
                  as={ Link }
                  to='/announcements/edit'
                  active={activeItem === 'notices'}
                  onClick={this.handleItemClick}>
                    <Content>Upcomming Events</Content>
                  </Dropdown.Item>
                <Dropdown.Item
                  as={ Link }
                  to='/postings'
                  active={activeItem === 'postings'}
                  onClick={this.handleItemClick}>
                  <Content>Postings</Content>
                </Dropdown.Item>
                <Dropdown.Item
                  as={ Link }
                  to='/calendar/events'
                  active={activeItem === 'Calendar Events'}
                  onClick={this.handleItemClick}>
                  <Content>Calendar Events</Content>
                </Dropdown.Item>
                <Dropdown.Item
                  as={ Link }
                  to='/program/tracker'
                  active={activeItem === 'Program Tracker'}
                  onClick={this.handleItemClick}>
                  <Content>Program Tracker</Content>
                </Dropdown.Item>
                <Dropdown.Item
                  as={ Link }
                  to='/students'
                  active={activeItem === 'students'}
                  onClick={this.handleItemClick}>
                  <Content>Students</Content>
                </Dropdown.Item>
                <Dropdown.Item
                  as={ Link }
                  to='/mailers'
                  active={activeItem === 'mailers'}
                  onClick={this.handleItemClick}>
                  <Content>Mailers</Content>
                </Dropdown.Item>
                <Dropdown.Item
                  as={ Link }
                  to='/contracts'
                  active={activeItem === 'contracts'}
                  onClick={this.handleItemClick}>
                  <Content>Contracts</Content>
                </Dropdown.Item>
                <Dropdown.Item
                  as={ Link }
                  to='/contractees'
                  active={activeItem === 'contractees'}
                  onClick={this.handleItemClick}>
                  <Content>Contractees</Content>
                </Dropdown.Item>
                <Dropdown.Item
                  as={ Link }
                  to='/contact_emails/manager'
                  active={activeItem === 'contact_emails'}
                  onClick={this.handleItemClick}>
                  <Content>Contact E-mails</Content>
                </Dropdown.Item>
              </DropDownMenu>
            </DropDown>
          }
          { user.canBeA('student') &&
            <DropDown item text='Vlog'>
              <DropDownMenu>
                <Dropdown.Item
                  as={ Link }
                  to='/student_videos'
                  active={activeItem === 'student_videos'}
                  onClick={this.handleItemClick}>
                  <Content>Student Videos</Content>
                </Dropdown.Item>
              </DropDownMenu>
            </DropDown>
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
        stackable
        style={{ borderBottom: '1px solid #ffffff'}}>
        <MenuItem
          name='home'
          as={ Link }
          to='/'
          active={activeItem === 'sensei'}
          onClick={this.handleItemClick} />
        <MenuItem
          name='about us'
          as={ Link }
          to='/about'
          active={activeItem === 'about us'}
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
          name='class schedule'
          active={activeItem === 'class schedule'}
          onClick={this.handleItemClick} />
        <MenuItem
          as={ Link }
          to='/news'
          name='upcoming events'
          active={activeItem === 'upcoming events'}
          onClick={this.handleItemClick} />
        <MenuItem
          name='contact us'
          as={ Link }
          to='/contact_email'
          active={activeItem === 'contact us'}
          onClick={this.handleItemClick} />
        <MenuItem
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
