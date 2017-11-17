 var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schedule = require ('node-schedule');
var nodemailer = require ('nodemailer');
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


var mailman = function(message){
/*You're probably wondering what happened here. As it turns out, the server we were using didn't work because it was
designed for development enviorments. I had to scour the internet until I found a way to send mail for real (instead of eating it the way that old server did). 
I found a way, but to make it work I had to set it up with my own personal email address.
I don't think that should matter. In any case, this works now.*/
	
	var trueDate = message.date;

	trueDate.setHours(trueDate.getHours()+7);
	
	//message.date.setHours( message.date.getHours()+7 );
	console.log("Adjusted hours: "+trueDate.getHours());
	var j = schedule.scheduleJob(trueDate , function(){
	console.log("Time to send a message!");
		//email crap

		nodemailer.createTestAccount((err,account) => {
			let transporter = nodemailer.createTransport({
				host: 'in-v3.mailjet.com',
				port: 587,
				secure:false,
				auth: {
					user: 'aef2ac7972a72a94cbc80b965e51c5f6',
					pass: '308fc2cb6ad3b3a1380b323bf7bb0bd6'
				}	
		});

		let mailOptions = {
			from: '"260 Email Scheduler" <kristophermiles@gmail.com>',
			to: message.destination,
			subject: message.title,
			text: message.message,
		};

		transporter.sendMail(mailOptions, (error,info) => {
			if (error) {
				return console.log(error);
			}	
			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s',
		nodemailer.getTestMessageUrl(info));

	   });

		//Now we need to delete the email from the database, now that it has been sent.
		message.remove();
		console.log("Should be done emailing, removed from the database.");
	});
   

});
    
};
	
router.post('/messages', function(req, res, next) {
  console.log("recieved new email to save.");
  console.log(JSON.stringify(req.body));
	var email = new Email(req.body);
  email.save(function(err, comment){
    if(err){ return next(err); }
   //This is where the magic happens.
	
    mailman(email);
    res.json(email);
  });
});


router.get('/wipe', function(req, res, next) {
  Email.remove({}, function(err) { 
   console.log('collection removed') 
});
    
    Email.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
