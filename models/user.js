const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  profilePicture: String,
  /*messages: {type: Array, default: [
    {conversation:"Kristen", timestamp: Number(Date.now()),
      messages: [{sender:"Username", recipient: "otherUser", text:"Welcome to my Chat App!", timestamp:Number(Date.now())}]
    }
  ]}*/
});

mongoose.model('Users', userSchema);
