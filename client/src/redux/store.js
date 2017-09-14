import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { fetchData } from './initActions';
import { isAuthenticated } from '../utils/auth';

const defaultState = {
  user: isAuthenticated() ? {} : null,
  polls: {},
  votes: []
};

const store = createStore(reducer, defaultState,
  applyMiddleware(thunk)
);

// Initialize the app
store.dispatch(fetchData());

export default store;
