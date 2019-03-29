const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const conversationSchema = new Schema({
  userOne: String,
  userTwo: String,
  timestamp: { type: Number, default: Number(Date.now()) },
  messages: {type: Array, default:
    [{sender:"Username", recipient: "otherUser", text:"Welcome to my Chat App! ~~~~conversation schema~~~", timestamp:Number(Date.now())}]
  }
});

mongoose.model('Conversations', conversationSchema);
