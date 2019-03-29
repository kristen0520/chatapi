module.exports = (app) => {

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const config = require('../config/dev');

const bcrypt = require('bcrypt');
const saltRounds = 10;

//database setup-----------------------------------------------

var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
mongoose.connect(dbUrl, function(error) {
  if(error) console.log(error)
  },
  {useNewUrlParser: true}
)
mongoose.connect(dbUrl);
require('../models/user')
const Users = mongoose.model('Users')

//passport local strategy login-------------------------------------------------------------

passport.use(new Strategy(
  function(username, password, cb) {
      Users.findOne({username: username}, function(err, user) {
        let hash = user.password;
        bcrypt.compare(password, hash, function(err, res) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          if(!res) {return cb(null, false); }
          return cb(null, user);
      });
    });
  }));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  Users.findOne({_id: id}, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



// Use application-level middleware for common functionality, including logging, parsing, and session handling----------------

/*app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));*/

//Initialize Passport and restore authentication state, if any, from the session--------------------------------------------

/*app.use(passport.initialize());
app.use(passport.session());*/

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/currentuser', (req, res) => {
  res.send(req.user);
  });

}
