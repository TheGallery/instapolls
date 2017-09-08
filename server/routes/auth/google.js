const google = require('express').Router();
const passport = require('passport');

google.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

google.get('/callback',
  passport.authenticate('google',
    {
      successRedirect: '/browse',
      failureRedirect: '/signin'
    })
);

module.exports = google;
