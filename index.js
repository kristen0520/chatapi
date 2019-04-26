const express = require ('express');
const app = express();
const config = require('./config/config');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
var passport = require('passport');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


//cors-----------------------------------------------

var corsOptions = {
  origin: 'https://chatappkm.herokuapp.com',
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
  methods: 'GET,PUT,POST,OPTIONS'
}
app.use(cors(corsOptions))


//auth session------------------------------------------------

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


//Initialize Passport and restore authentication state - if any - from the session----------------------------

app.use(passport.initialize());
app.use(passport.session());


//database setup--------------------------------------------------------------------------------------

var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
mongoose.connect(dbUrl, function(error) {
  if(error) console.log(error)
  },
  {useNewUrlParser: true}
)
mongoose.connect(dbUrl);
require('./models/user')
const Users = mongoose.model('Users')


//api paths----------------------------------------------------------

require('./routes/home')(app);
require('./routes/authroutes')(app);
require('./routes/createaccount')(app);
require('./routes/messages')(app);
require('./routes/newconversation')(app);
require('./routes/conversations')(app);


//port---------------------------------------------------------

let PORT = process.env.PORT || 5000;
app.listen(PORT)
