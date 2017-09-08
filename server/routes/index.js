const routes = require('express').Router();
const auth = require('./auth');
const path = require('path');

routes.use('/auth', auth);

routes.get('/*', (req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'));
});

module.exports = routes;
