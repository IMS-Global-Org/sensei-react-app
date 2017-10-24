import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'
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
import 'react-datepicker/dist/react-datepicker.min.css'
import '../styles/background.css'

// Custom Components
import Settings from './Settings'
import Programs from './programs/Programs'
import AnnouncementManager from './AnnouncementManager'
import HomePagePostings from './HomePagePostings'
import Calendar from './calendar/Calendar'
import EventEditor from './calendar/EventEditor'
import Header from './header/Header'
import ProgramTracker from './programs/ProgramTracker'
import Location from './location/Location'
import Students from './students/Students'
import Mailers from './mailers/Mailers'
import Contracts from './contracts/Contracts'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NavBar />
        <div className='multi-bg-images'>
          <Flash />
          <FetchUser>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/calendar' component={Calendar} />
              <Route exact path='/programs' component={Programs} />
              <Route exact path='/location' component={Location} />
              <ProtectedRoute exact path='/calendar/events' component={EventEditor} />
              <ProtectedRoute exact path='/program/tracker' component={ProgramTracker} />
              <ProtectedRoute exact path='/settings' component={Settings} />
              <ProtectedRoute path='/announcements' component={AnnouncementManager} />
              <ProtectedRoute path='/postings' component={HomePagePostings} />
              <ProtectedRoute path='/students' component={Students} />
              <ProtectedRoute path='/mailers' component={Mailers} />
              <ProtectedRoute path='/contracts' component={Contracts} />
              <Route component={NoMatch} />
            </Switch>
          </FetchUser>
        </div>
      </div>
    );
  }
}

export default App;
