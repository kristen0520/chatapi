const express = require ('express');
const app = express();
const config = require('./config/dev');
const mongoose = require('mongoose');
var cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

//api paths----------------------------------------------------------

require('./routes/home')(app);
require('./routes/authroutes')(app);
require('./routes/createaccount')(app);

//port setup---------------------------------------------------------

let PORT = process.env.PORT || 5000;
app.listen(PORT)
