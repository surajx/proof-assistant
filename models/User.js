var mongoose = require('mongoose');

var User = mongoose.model('User', new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true , index:true},
  password: { type: String, select: false },
  fullName: String,
  picture: String,
}));

module.exports = User;
