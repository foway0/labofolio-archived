const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// TODO : encrypt
// TODO : refresh tokens
// TODO : expires
module.exports = {
  install: (app, ops) => {
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });
    const gStrategy = new GoogleStrategy(ops,
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
          return done(null, {accessToken, refreshToken, profile});
        });
      });
    passport.use(gStrategy);
    refresh.use(gStrategy);
    app.use(passport.initialize());
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile'], accessType: 'offline' }));
    app.get('/auth/google/callback', passport.authenticate( 'google', ));
  }
};