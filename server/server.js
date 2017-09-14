require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(process.env.DB);

require('./models/User');
require('./models/Poll');
require('./models/Vote');
require('./config/passport');

const sessConfig = {
  name: 'va.sid',
  cookie: {
    maxAge: 2592000000 // 30 days
  },
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
};

app.use(bodyParser.json());
app.use(session(sessConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('../client/build', { index: false }));

app.use('/', require('./routes'));

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running.');
});
