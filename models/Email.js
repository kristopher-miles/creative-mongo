var mongoose = require('mongoose');
var EmailSchema = new mongoose.Schema({
  subject: String,
  destination: String,
  messageText: String,
  date: Date,
});
mongoose.model('Email', EmailSchema);
