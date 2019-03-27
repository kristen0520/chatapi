module.exports = (app) => {

  const config = require('../config/dev');
  const mongoose = require('mongoose');
  var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
  mongoose.connect(dbUrl, function(error) {
    if(error) console.log(error)
    },
    {useNewUrlParser: true}
  )
  mongoose.connect(dbUrl);
  require('../models/user')
  const Users = mongoose.model('Users')

  app.get('/messages', (req, res) => {
    console.log("/MESSAGES000000000000000000")
    console.log(req.user.username)
    let id = req.user._id
    let u = 'Kristen';
    if(req.query.u){
      u = req.query.u
    }

    Users.findOne({_id: id}, function(err, data){
      if(err){res.send(err)}
      let m = data.messages
      //let messages = m.sort({timestamp: -1})
      res.send(m)
    })

  })
}
