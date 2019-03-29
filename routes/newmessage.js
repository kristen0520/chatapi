module.exports = (app) => {

//------Connect to Database--------------------------------------------------------------------

  const config = require('../config/dev');
  const mongoose = require('mongoose');
  var dbUrl = 'mongodb://'+config.dbuser+':'+config.dbpassword+'@ds141294.mlab.com:41294/chat';
  mongoose.connect(dbUrl, function(error) {
    if(error) console.log(error)},
    {useNewUrlParser: true}
  )
  mongoose.connect(dbUrl);

//-------Import Mongoose Model-----------------------------------------------------------------

  require('../models/conversation');
  const Conversations = mongoose.model('Conversations');

//-------Create Route-------------------------------------------------------------------------

  app.post('/newmessages', (req, res) => {
    console.log("POST REQUEST TO /newmessages000000000000000000000000000000000000000000000000000000000000000000000000000000");
    let text = req.query.text;
    let recipient = req.query.recipient;
    let id = req.query.conversationid;
    //let sender = req.user.username;
    console.log(req.user)

    let newMessage = {sender: "test", recipient: recipient, timestamp: Number(Date.now()), text: text};

    //id will be the conversation id passed from selected conversation on the front end
    //the hard coded userOne query is temporary

    Conversations.findOneAndUpdate({userOne: "Kristen"},
      { $push: {messages: newMessage} },
      {new: true},
      function(err, data) {
        if (err) { return cb(err); }
        res.send("updated conversation in database")
        console.log("sender messages updated")
      });
    });

}
