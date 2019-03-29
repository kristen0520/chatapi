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
  
  require('../models/conversation');
  const Conversations = mongoose.model('Conversations');

  app.post('/newmessages', (req, res) => {
    let messages = req.query.message;
    let sender = req.query.user;
    let recipient = req.query.conversation;

    Conversations.create({
      userOne: req.query.user,
      userTwo: req.query.user,
      timestamp: Number(Date.now()),
      messages: [messages]}, function(err, user) {
        if (err) { return cb(err); }
        res.send("inserted new conversation in database")
    });



  })

}
