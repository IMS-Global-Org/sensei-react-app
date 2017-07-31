import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import { Switch, Route } from 'react-router-dom';
import FetchUser from './FetchUser';
import styled from 'styled-components';

// Custom Components
import Settings from './Settings'
import Courses from './Courses'
import AnnouncementManager from './AnnouncementManager'

// Custom Styled Components
const MainDiv = styled.div`
  height: 125vh;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#6d0019+0,8f0222+44,6d0019+100 */
  background: rgb(109,0,25); /* Old browsers */
  background: -moz-linear-gradient(45deg, rgba(109,0,25,1) 0%, rgba(143,2,34,1) 44%, rgba(109,0,25,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(45deg, rgba(109,0,25,1) 0%,rgba(143,2,34,1) 44%,rgba(109,0,25,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(45deg, rgba(109,0,25,1) 0%,rgba(143,2,34,1) 44%,rgba(109,0,25,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6d0019', endColorstr='#6d0019',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
`

class App extends Component {
  render() {
    return (
      <MainDiv>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <ProtectedRoute exact path='/settings' component={Settings} />
            <ProtectedRoute path='/courses' component={Courses} />
            <ProtectedRoute path='/announcements' component={AnnouncementManager} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </MainDiv>
    );
  }
}

export default App;
