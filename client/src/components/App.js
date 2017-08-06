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

// Global Custom CSS Style Sheets
import 'react-datetime/css/react-datetime.css'

// Custom Components
import Settings from './Settings'
import Courses from './Courses'
import AnnouncementManager from './AnnouncementManager'
import HomePagePostings from './HomePagePostings'


class App extends Component {
  render() {
    return (
      <div>
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
            <ProtectedRoute path='/postings' component={HomePagePostings} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
      </div>
    );
  }
}

export default App;
