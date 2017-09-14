import { RECEIVE_USER, ADD_POLL, REMOVE_POLL } from '../actionTypes';

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
    case REMOVE_POLL:
      return {
        ...user,
        polls: [
          ...user.polls.slice(0, user.polls.indexOf(action.pollId)),
          ...user.polls.slice(user.polls.indexOf(action.pollId + 1))
        ]
      };
    default:
      return user;
  }
}
