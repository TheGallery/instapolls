const user = require('express').Router();

user.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user._id,
      name: req.user.name,
      polls: req.user.polls
    });
  } else {
    res.json(null);
  }
});

module.exports = user;
