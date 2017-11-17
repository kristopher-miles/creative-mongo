 var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schedule = require ('node-schedule');
var emailer = require ('nodemailer');
var Email = mongoose.model('Email');

router.get('/messages', function(req, res, next) {
  Email.find(function(err, messages){
    if(err){ return next(err); }
    res.json(messages);
  });
});

router.post('/messages', function(req, res, next) {
  var email = new Email(req.body);
  email.save(function(err, comment){
    if(err){ return next(err); }
   //This is where the magic happens.
    res.json(email);
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
