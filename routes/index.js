 var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schedule = require ('node-schedule');
var emailer = require ('nodemailer');
var Email = mongoose.model('Email');

router.param('message', function(req,res,next,id){
	var query = Message.findById(id);
	query.exec(function(err,comment){
		if (err) {return next(err);}
		if (!message) {return next(new Error('cant find message'));}
		req.message = message;
		return next();
	});	
});

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
