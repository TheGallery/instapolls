import { combineReducers } from 'redux';

import user from './user';
import polls from './polls';
import votes from './votes';

const reducer = combineReducers({
  user,
  polls,
  votes
});

export default reducer;
