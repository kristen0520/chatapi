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
    let text = req.query.text;
    let sender = req.user.username;
    let recipient = req.query.recipient;
    let usersArr= [sender, recipient].sort();
    let newMessage = {sender: sender, recipient: recipient, timestamp: Number(Date.now()), text: text};

    if(recipient == "{}"){res.send("Who was this message for? Please select recipient")}

    else{

      /*Conversations.create({
        users: usersArr,
        timestamp: Number(Date.now()),
        messages: [text]}, function(err, user) {
          if (err) { return cb(err); }
          res.send("inserted new conversation in database")
        });*/

        Conversations.findOneAndUpdate({users: usersArr},
          {
            timestamp: Number(Date.now()),
            $push: {messages: newMessage}
          },
          {upsert: true},
          function(err, data) {
            if (err) { return cb(err); }
            res.send("updated conversation in database")
          });

      }//end else
    })//end app post

}//end module exports
