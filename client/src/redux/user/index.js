import { RECEIVE_USER, ADD_POLL } from '../actionTypes';

export function receiveUser (user) {
  return {
    type: RECEIVE_USER,
    user
  };
}

export default function reducer (user = null, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case ADD_POLL:
      return {
        ...user,
        polls: [...user.polls, action.poll._id]
      };
    default:
      return user;
  }
}
