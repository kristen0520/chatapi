module.exports = (app) => {

  const mongoose = require('mongoose');
  const config = require('../config/dev');
  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
  mongoose.connect(dbUrl, function(error) {console.log(error)}, {useNewUrlParser: true})

  require('../models/user')
  const Users = mongoose.model('Users')

  app.post('/createaccount', (req, res) => {
    let p = req.query.password;
    let u = req.query.username;
    let hash = bcrypt.hashSync(p, saltRounds);
      Users.create({username: u, password: hash}, function(err, user) {
        if (err) { return cb(err); }
        res.send("created new user in database")
      });
  })

}
