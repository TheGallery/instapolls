const auth = require('express').Router();
const twitter = require('./twitter');
const google = require('./google');
const github = require('./github');

auth.use('/twitter', twitter);
auth.use('/google', google);
auth.use('/github', github);

auth.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json({error: 'Unauthenticated.'});
  }
});

module.exports = auth;
