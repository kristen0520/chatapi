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

  app.get('/messages', (req, res) => {
    let id = req.query.id;
    //id will be the conversation id passed from selected conversation on the front end
    //the hard coded userOne query is temporary - it will be replaced with id query

    Conversations.findOne({userOne: "Kristen"}, function(err, data){
      if(err){res.send(err)}
      res.send(data)
    })

  })
}
