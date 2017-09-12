import { receiveUser } from './user';
import { receivePolls } from './polls';
import { receiveVotes } from './votes';

function fetchUser () {
  return fetch('/api/me', {
    credentials: 'include'
  })
  .then(res => res.json())
  .then(user => user);
}

function fetchPolls () {
  return fetch('/api/polls')
    .then(res => res.json())
    .then(polls => polls);
}

function fetchVotes () {
  return fetch('/api/votes', {
    credentials: 'include'
  })
  .then(res => res.json())
  .then(votes => votes.map(vote => vote.pollID));
}

export function fetchData () {
  return function (dispatch) {
    Promise.all([fetchUser(), fetchPolls(), fetchVotes()]).then(res => {
      dispatch(receiveUser(res[0]));
      dispatch(receivePolls(res[1]));
      dispatch(receiveVotes(res[2]));
    });
  };
}
