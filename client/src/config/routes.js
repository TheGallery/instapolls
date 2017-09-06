import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Welcome from '../components/Welcome';
import BrowsePolls from '../components/BrowsePolls';
import CreatePoll from '../components/CreatePoll';
import Navbar from '../components/Navbar';
import ViewPoll from '../components/ViewPoll';

const routes = (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route path='/' render={(props) => (
          <div className='Main-root'>
            <Navbar {...props} />
            <Route path='/browse' component={BrowsePolls} />
            <Route path='/new' component={CreatePoll} />
            <Route path='/polls/:id' component={ViewPoll} {...props} />
            <Route path='/me' render={(props) => (
              <BrowsePolls {...props} isUser />
            )}
            />
          </div>
        )}
        />
      </Switch>
    </div>
  </Router>
);

export default routes;
