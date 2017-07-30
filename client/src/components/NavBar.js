import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { withRouter } from 'react-router-dom';

class NavBar extends Component {
  state={ activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  rightNavs = () => {
    const { user, dispatch, history } = this.props;
    const { activeItem } = this.state

    if(user.id) {
      return(
        <Menu.Menu position='right'>
          { user.permissions.split(',').includes('user') &&
            <Menu.Item
              name='notices'
              as={ Link }
              to='/announcements'
              active={activeItem === 'notices'}
              onClick={this.handleItemClick} />
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
          name='courses'
          as={ Link }
          to='/courses'
          active={activeItem === 'courses'}
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
