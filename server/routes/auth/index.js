const auth = require('express').Router();
const twitter = require('./twitter');
const google = require('./google');
const github = require('./github');

auth.use('/twitter', twitter);
auth.use('/google', google);
auth.use('/github', github);

auth.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = auth;
