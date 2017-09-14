const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const users = require('../controllers/users');

/* GitHub Login */
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.CB_HOST}/auth/github/callback`
}, function (accessToken, refreshToken, profile, done) {
  users.login(profile, function (err, user) {
    if (err) return done(err);

    return done(null, user);
  });
}));

/* Twitter Login */
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWTTR_CONSUMER_KEY,
  consumerSecret: process.env.TWTTR_CONSUMER_SECRET,
  callbackURL: `${process.env.CB_HOST}/auth/twitter/callback`
}, function (token, tokenSecret, profile, done) {
  users.login(profile, function (err, user) {
    if (err) return done(err);

    return done(null, user);
  });
}));

/* Google Login */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.CB_HOST}/auth/google/callback`
}, function (accessToken, refreshToken, profile, done) {
  users.login(profile, function (err, user) {
    if (err) return done(err);

    return done(null, user);
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  users.getOne(id, function (err, user) {
    if (err) return done(err);

    done(null, user);
  });
});
