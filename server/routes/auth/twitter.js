const twitter = require('express').Router();
const passport = require('passport');

twitter.get('/', passport.authenticate('twitter'));

twitter.get('/callback',
  passport.authenticate('twitter'),
  function (req, res) {
    res.json(req.user);
  }
);

module.exports = twitter;
