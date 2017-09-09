import { createStore } from 'redux';

import { isAuthenticated } from '../utils/auth';

import reducer from './reducer';

const defaultState = {
  user: isAuthenticated() ? {} : null
};

export default createStore(reducer, defaultState);
