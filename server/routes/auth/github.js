const github = require('express').Router();
const passport = require('passport');

github.get('/', passport.authenticate('github', { scope: ['user:email'] }));

github.get('/callback',
  passport.authenticate('github',
    {
      successRedirect: '/browse',
      failureRedirect: '/signin'
    })
);

module.exports = github;
