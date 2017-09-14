import { RECEIVE_POLLS, ADD_POLL, RECEIVE_POLL, REMOVE_POLL } from '../actionTypes';
import { pollArrToObj } from '../../utils/polls';
import _omit from 'lodash/omit';

export function receivePolls (polls) {
  return {
    type: RECEIVE_POLLS,
    polls: pollArrToObj(polls)
  };
}

export function addPoll (poll, user) {
  return {
    type: ADD_POLL,
    userName: user.name,
    poll
  };
}

export function receivePoll (poll) {
  return {
    type: RECEIVE_POLL,
    poll
  };
}

export function deletePoll (pollId) {
  return {
    type: REMOVE_POLL,
    pollId
  };
}

export default function reducer (polls = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS:
      return action.polls;
    case ADD_POLL:
      return {
        [action.poll._id]: {
          ...action.poll,
          createdBy: {
            name: action.userName
          },
          createdAt: new Date(action.poll.createdAt).toDateString()
        },
        ...polls
      };
    case REMOVE_POLL:
      return _omit(polls, action.pollId);
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
