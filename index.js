const express = require ('express');
const app = express();
const config = require('./config/dev');
const mongoose = require('mongoose');
var cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');

//cors setup-----------------------------------------------

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
  methods: 'GET,PUT,POST,OPTIONS'
}
app.use(cors(corsOptions))

//database setup-----------------------------------------------

var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
mongoose.connect(dbUrl, function(error) {
  if(error) console.log(error)
  },
  {useNewUrlParser: true}
)
mongoose.connect(dbUrl);
require('./models/user')
const Users = mongoose.model('Users')


app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//api paths----------------------------------------------------------

require('./routes/home')(app);
require('./routes/authroutes')(app);
require('./routes/createaccount')(app);
require('./routes/messages')(app);
require('./routes/newmessage')(app);
require('./routes/newconversation')(app);


//port setup---------------------------------------------------------

let PORT = process.env.PORT || 5000;
app.listen(PORT)
