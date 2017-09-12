const api = require('express').Router();
const polls = require('./polls');
const user = require('./user');
const votes = require('./votes');

api.use('/polls', polls);
api.use('/me', user);
api.use('/votes', votes);

module.exports = api;
