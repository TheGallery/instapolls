const routes = require('express').Router();
const path = require('path');
const auth = require('./auth');
const api = require('./api');

routes.use('/api', api);
routes.use('/auth', auth);

routes.get('/*', (req, res) => {
  if (req.user) {
    res.cookie('uid', req.user.id);
  }

  res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
});

module.exports = routes;
