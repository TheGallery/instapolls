const google = require('express').Router();
const passport = require('passport');

google.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

google.get('/callback',
  passport.authenticate('google'),
  function (req, res) {
    res.json(req.user);
  }
);

module.exports = google;
