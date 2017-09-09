import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';

import Welcome from '../components/Welcome';
import BrowsePolls from '../components/BrowsePolls';
import CreatePoll from '../components/CreatePoll';
import Navbar from '../components/Navbar';
import ViewPoll from '../components/ViewPoll';
import Signin from '../components/Signin';

import { isAuthenticated } from '../utils/auth';

const routes = (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/' render={(props) => (
            <div className='Main-root'>
              <Navbar {...props} />
              <Route path='/browse' component={BrowsePolls} />
              <Route path='/new' render={(props) => (
                isAuthenticated()
                  ? <CreatePoll {...props} />
                  : <Redirect to='/signin' />
              )} />
              <Route path='/polls/:id' component={ViewPoll} />
              <Route path='/signin' component={Signin} />
              <Route path='/me' render={(props) => (
                <BrowsePolls {...props} isUser />
              )} />
            </div>
          )} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default routes;
