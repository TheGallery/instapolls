import { createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { isAuthenticated } from '../utils/auth';

import reducer from './reducer';

const defaultState = {
  user: isAuthenticated() ? {} : null
};

export const history = createHistory();

export default createStore(reducer, defaultState);
