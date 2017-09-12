const polls = require('express').Router();
const pollsCtrl = require('../../controllers/polls');

polls.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    pollsCtrl.addPoll(req.body, req.user, function (err, poll) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        res.json(poll);
      }
    });
  } else {
    res.json({error: 'User is not authenticated'});
  }
});

polls.get('/', (req, res) => {
  pollsCtrl.getAll(function (err, polls) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(polls);
    }
  });
});

polls.delete('/:pollId', (req, res) => {
  if (req.isAuthenticated()) {
    pollsCtrl.delete(req.params.pollId, req.user, function (err, success) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        res.json('ok');
      }
    });
  } else {
    res.json({error: 'Server error.'});
  }
});

module.exports = polls;
