const votes = require('express').Router();
const voteCtrl = require('../../controllers/votes');

votes.get('/', (req, res) => {
  // Either get the registered user or the ip of the guest
  const user = req.user || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  voteCtrl.getVotes(user, function (err, votes) {
    if (err) {
      res.status(500).json({'error': 'Server error.'});
      return;
    }

    res.json(votes);
  });
});

votes.post('/', (req, res) => {
  // Either get the registered user or the ip of the guest
  const user = req.user || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  voteCtrl.addVote(req.body.pollId, req.body.option, user, function (err, poll) {
    if (err) {
      res.status(500).json({'error': 'Server error.'});
      return;
    }

    res.json(poll);
  });
});

votes.delete('/', (req, res) => {
  // Either get the registered user or the ip of the guest
  const user = req.user || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  voteCtrl.removeVote(req.body.pollId, user, function (err, poll) {
    if (err) {
      res.status(500).json({'error': 'Server error.'});
      return;
    }

    res.json(poll);
  });
});

module.exports = votes;
