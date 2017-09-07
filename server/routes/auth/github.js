const github = require('express').Router();
const passport = require('passport');

github.get('/', passport.authenticate('github', { scope: ['user:email'] }));

github.get('/callback',
  passport.authenticate('github'),
  function (req, res) {
    res.json(req.user);
  }
);

module.exports = github;
