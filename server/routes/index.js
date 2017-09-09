const routes = require('express').Router();
const auth = require('./auth');
const path = require('path');

routes.use('/auth', auth);

routes.get('/*', (req, res) => {
  if (req.user) {
    res.cookie('uid', req.user.id);
  }

  res.sendFile(path.resolve('../client/build/index.html'));
});

module.exports = routes;
