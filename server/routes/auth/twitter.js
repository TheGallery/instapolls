const twitter = require('express').Router();
const passport = require('passport');

twitter.get('/', passport.authenticate('twitter'));

twitter.get('/callback',
  passport.authenticate('twitter',
    {
      successRedirect: '/browse',
      failureRedirect: '/signin'
    })
);

module.exports = twitter;
