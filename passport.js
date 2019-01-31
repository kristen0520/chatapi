var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const config = require('./config/dev');
const mongoose = require('mongoose');

var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
mongoose.connect(dbUrl, function(error) {
  if(error) console.log(error)
  // if error is truthy, the initial connection failed.
})
mongoose.connect(dbUrl);

require('./models/user')
const User = mongoose.model('Users')

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        //res.send("incorrect username")
        console.log("incorrect username")
        return done(null, false, { message: 'Incorrect username.' });
      }
      else if (user.password !== password) {
        console.log("incorrect password")
        return done(null, false, { message: 'Incorrect password.' });
      }
      passport.serializeUser(function(user, done) {
        done(null, user);
      });
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
      return done(null, user);
    });
  }
));
