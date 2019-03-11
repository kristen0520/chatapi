const express = require ('express');
const app = express();
const config = require('./config/dev');
const mongoose = require('mongoose');
var passport = require('passport');
var cookieSession = require('cookie-session')
var MongoClient = require('mongodb').MongoClient
const WebSocket = require('ws');
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
  methods: 'GET,PUT,POST,OPTIONS'
}
app.use(cors(corsOptions))


require('./passport')
require('./services/passport');
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


app.use(require('serve-static')(__dirname + '/../../public'));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

require('./routes/home')(app);
require('./routes/currentuser')(app);
require('./services/passport')(app);




let PORT = process.env.PORT || 5000;
app.listen(PORT)
