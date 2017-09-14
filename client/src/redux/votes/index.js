import { RECEIVE_VOTES, RECEIVE_VOTE } from '../actionTypes';
import { receivePoll } from '../polls';

export function receiveVotes (votes) {
  return {
    type: RECEIVE_VOTES,
    votes
  };
}

export function receiveVote (pollId, action) {
  return {
    type: RECEIVE_VOTE,
    action,
    pollId
  };
}

export function addVote (pollId, option) {
  return function (dispatch) {
    fetch('/api/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        pollId,
        option
      })
    })
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        return res.json().then(Promise.reject.bind(Promise));
      }
    })
    .then(data => {
      dispatch(receivePoll(data));
      dispatch(receiveVote(pollId, 'add'));
    })
    .catch(err => {
      console.log('Server error.');
    });
  };
}

export function removeVote (pollId) {
  return (dispatch) => {
    fetch('/api/votes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({pollId})
    }).then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }

      return res.json().then(Promise.reject.bind(Promise));
    }).then(data => {
      dispatch(receiveVote(pollId, 'remove'));
      dispatch(receivePoll(data));
    }).catch(err => {
      console.log('Server error.');
    });
  };
}

export default function reducer (votes = [], action) {
  switch (action.type) {
    case RECEIVE_VOTES:
      return action.votes;
    case RECEIVE_VOTE:
      if (action.action === 'add') {
        return [
          ...votes,
          action.pollId
        ];
      } else {
        return [
          ...votes.slice(0, votes.indexOf(action.pollId)),
          ...votes.slice(votes.indexOf(action.pollId) + 1)
        ];
      }
    default:
      return votes;
  }
}
