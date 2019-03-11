var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var config = require('../config/config')

const mongoose = require('mongoose');

var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
mongoose.connect(dbUrl, function(error) {
  if(error) console.log(error)
  // if error is truthy, the initial connection failed.
  },
  {useNewUrlParser: true}
)

require('../models/user')
const Users = mongoose.model('Users')

module.exports = (app) => {

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    console.log("using Pasport Local Strategy00000000000000000000")
    console.log("username!!!!!!!!!!!! = "+username)
    console.log("PASSWORD!!!!!!!!!!!! = "+password)
    Users.findOne({username: username}, function(err, user) {
      if (err) { console.log("Passport Local Login ERROR = "); console.log(err)
        return cb(err); }
      if (!user) { console.log("Passport Local USER DOES NOT EXIST ")
        Users.create({username: username, password: password}).then(
          () => {Users.findOne({username: username}, function(err, user) {
            console.log("CREATED NEW USER?????")
          return cb(null, user);
          })})
        return cb(null, false); }
      if (user.password != password) { console.log("Passport Local USER EXISTS BUT PASSORD DOES NOT MATCH ")
        return cb(null, false); }
        console.log("Passport Local Strategy MADE IT THROUGH ALL THE CHECKS ")
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  Users.findOne({_id: id}, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Define routes.

app.post('/login',  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });


}
