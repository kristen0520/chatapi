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

  app.get('/conversations', (req, res) => {

    if(req.user == null){res.send("login to view your conversations")}

    else{
      let user = req.user.username;

      Conversations.find({users: {$in: [user]} },
      function(err, data) {
        if(err){res.send(err)}
        res.send(data)
      })

  }
})

}
