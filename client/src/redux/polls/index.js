import { RECEIVE_POLLS, ADD_POLL, RECEIVE_POLL } from '../actionTypes';
import { pollArrToObj } from '../../utils/polls';

export function receivePolls (polls) {
  return {
    type: RECEIVE_POLLS,
    polls: pollArrToObj(polls)
  };
}

export function addPoll (poll) {
  return {
    type: ADD_POLL,
    poll
  };
}

export function receivePoll (poll) {
  return {
    type: RECEIVE_POLL,
    poll
  };
}

export default function reducer (polls = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return action.polls;
    case ADD_POLL:
      return {
        ...polls,
        [action.poll._id]: {
          ...action.poll,
          createdAt: new Date(action.poll.createdAt).toDateString()
        }
      };
    case RECEIVE_POLL:
      // We are not updating all the data because the user comes
      // back as an ID from the DB when adding a new vote.
      return {
        ...polls,
        [action.poll._id]: {
          ...polls[action.poll._id],
          totalVotes: action.poll.totalVotes,
          options: action.poll.options
        }
      };
    default:
      return polls;
  }
}
