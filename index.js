const express = require ('express');
const app = express();
const config = require('./config/dev');
const mongoose = require('mongoose');
var passport = require('passport');
var MongoClient = require('mongodb').MongoClient

require('./passport')

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
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send("chat app api")
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/currentuser',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);

app.get('/login', (req, res) => {
  res.send("login api")
})

app.get('/makeuser/*', (req, res) => {
  let reqUrl = req.url
  let u = reqUrl.slice(10)
  console.log("user = "+ u)
  const newuser = new Users()
  newuser.username = u
  newuser.password = 'ok'
  newuser.save(function(err) {
    if(err) console.log(err)

  })
  res.sendStatus(200)
})

app.get('/currentuser', (req, res) => {
  res.send(req.user)
})

app.get('/user/*', (req, res) => {
  let reqUrl = req.url
  let u = reqUrl.slice(6)

  Users.find({username:u})
    .then(
      (existingUser) => {
        res.send(existingUser)
      })
    .catch( () => {
      res.send("no user")
    })

app.post('/createaccount', (req, res) => {
  let newUser = req.body.newUser
  db.collection('Users').insert({
    username: newUser.username,
    password: newUser.password,
    profilePicture: newUser.profilePicture,
    messages: {}
  })
})

});

let PORT = process.env.PORT || 5000;
app.listen(PORT)
