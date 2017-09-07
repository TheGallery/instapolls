const routes = require('express').Router();
const auth = require('./auth');

routes.use('/auth', auth);

routes.get('/', (req, res) => {
  res.sendFile('../client/build/index.html');
});

module.exports = routes;
