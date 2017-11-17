var mongoose = require('mongoose');
var EmailSchema = new mongoose.Schema({
  subject: String,
  destination: mongoose.SchemaTypes.Email,
  messageText: String,
  date: Date,
});
mongoose.model('Email', EmailSchema);
