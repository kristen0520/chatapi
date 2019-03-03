const express = require ('express');
const app = express();
const config = require('./config/dev');
const mongoose = require('mongoose');
var passport = require('passport');
var cookieSession = require('cookie-session')
var MongoClient = require('mongodb').MongoClient
const WebSocket = require('ws');

require('./passport')
require('./protocol/websocket')

var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
mongoose.connect(dbUrl, function(error) {
  if(error) console.log(error)
  // if error is truthy, the initial connection failed.
  },
  {useNewUrlParser: true}
)
mongoose.connect(dbUrl);

require('./models/user')
const Users = mongoose.model('Users')


app.use(cookieSession({
 name: 'session',
 keys: ['nfaKERAedfwueif32984723FKGUVD3542837', 'GJAITAH372315010hfauDSFAFA323425']
}))

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'strawberry',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/home')(app)
require('./routes/currentuser')(app)

app.post('/login',
  passport.authenticate('local', { successRedirect: '/currentuser',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);


let PORT = process.env.PORT || 5000;
app.listen(PORT)
