const polls = require('express').Router();
const pollsCtrl = require('../../controllers/polls');

polls.get('/', (req, res) => {
  pollsCtrl.getAll(function (err, polls) {
    if (err) {
      res.status(500).json(err);
      return;
    }

    res.json(polls);
  });
});

polls.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    pollsCtrl.addPoll(req.body, req.user, function (err, poll) {
      if (err) {
        res.status(500).json(err);
        return;
      }

      res.json(poll);
    });
  } else {
    res.status(401).json({error: 'User is not authenticated.'});
  }
});

polls.delete('/:pollId', (req, res) => {
  if (req.isAuthenticated()) {
    pollsCtrl.delete(req.params.pollId, req.user, function (err) {
      if (err) {
        res.status(500).json({'error': 'Database error.'});
        return;
      }

      res.json('success');
    });
  } else {
    res.status(401).json({error: 'User is not authenticated.'});
  }
});

module.exports = polls;
