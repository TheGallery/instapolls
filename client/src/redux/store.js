import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { isAuthenticated } from '../utils/auth';
import reducer from './reducer';
import { fetchData } from './initActions';

import user from '../data/user';

const defaultState = {
  user: isAuthenticated() ? user : null,
  polls: [],
  votes: []
};

const store = createStore(reducer, defaultState,
  applyMiddleware(thunk)
);

store.dispatch(fetchData());

export default store;
