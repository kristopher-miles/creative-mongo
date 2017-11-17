var mongoose = require('mongoose');
var EmailSchema = new mongoose.Schema({
  title: String,
  destination: String,
  message: String,
  date: Date,
});
mongoose.model('Email', EmailSchema);
