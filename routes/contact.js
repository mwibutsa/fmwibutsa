var express = require('express');
var router = express.Router();
var ContactCollection = require('../databases/contact-collection');
var nodeMailer = require('nodemailer');
var transport = nodeMailer.createTransport({
	service:'gmail',
	auth:{
		user:'mflohost@gmail.com',
		pass:'Host@1996'
	}
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact',{title:"Contact"});
});

router.post('/',(req,res)=>{
	var contactData = {
		name:req.body.name,
		email:req.body.email,
		message:req.body.message
	}
	var contact = new ContactCollection(contactData);
	contact.save((error)=>{
		if (error) {
			console.log(error);
		}
		else{
			res.redirect('/contact-success');
		}
	});
	var mailOption ={
		from:'mflohost@gmail.com',
		to:req.body.email,
		subject:req.body.name,
		text:req.body.message,
		html:`${req.body.message}<br><a href="www.onartstudio.com">Visit our website</a>`
	};
	transport.sendMail(mailOption,(error,info)=>{
		if(error){
			console.log('==========SEND EMAIL ERROR==========================');
			console.log(error);
			console.log('====================================');
		}
		else{
			console.log('=============SEND MAIL RESULT=======================');
			console.log('Email Sent:'+info.response);
			console.log('====================================');
		}
	})
});
module.exports = router;
