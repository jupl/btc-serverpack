var jsonfile = require('jsonfile');

/**
 * Set up Passport if it is available and connect to the application. Passport
 * will use the user model.
 * @param {Express} app Express application to add Passport to.
 */
module.exports = function(app) {
  // Check if Passport is available
  var dependencies = jsonfile.readFileSync('package.json').dependencies;
  if(!dependencies.passport) {
    return;
  }

  // Get user model and passport+strategies
  var User = require('../models/user');
  var passport = require('passport');
  var strategies = [
    require('./local')
  ];

  // Hook in with user model
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, '-password').exec(done);
  });

  // Add any strategies required
  strategies.forEach(function(strategy) {
    passport.use(strategy);
  });

  // Connect middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
