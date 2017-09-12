const votes = require('express').Router();
const voteCtrl = require('../../controllers/votes');

votes.post('/', (req, res) => {
  const user = req.user || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  voteCtrl.addVote(req.body.poll, req.body.option, user, (poll) => {
    if (!poll) {
      res.status(500).json({'error': 'Server error.'});
    } else {
      res.json(poll);
    }
  });
});

votes.delete('/', (req, res) => {
  const user = req.user || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  voteCtrl.removeVote(req.body.pollId, user, (poll) => {
    if (!poll) {
      res.status(500).json({'error': 'Server error.'});
    } else {
      res.json(poll);
    }
  });
});

votes.get('/', (req, res) => {
  const user = req.user || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  voteCtrl.getVotes(user, (votes) => {
    res.json(votes);
  });
});

module.exports = votes;
