const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  profilePicture: String,
  messages: Object
});

mongoose.model('Users', userSchema);
