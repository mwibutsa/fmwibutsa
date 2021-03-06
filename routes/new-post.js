var express = require('express');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
var Post = require('../databases/post-collection');
router.use(session({
	secret:"_@1!9(9)6^%7",
	resave:false,
	saveUninitialized:true,
	cookie:{}
}))
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('new-post',{title:'New post'});
});
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.post('/',(req,res)=>{
	if (req.files) {
		var file = req.files.postfile,
		fileName = file.name;
		file.mv('./public/postfiles/'+fileName,(error)=>{
			if (error) {
				console.log(error);
				fileName = '';
			}
			else{
				fileName = '.public/postfiles/'+fileName;
			}
		})
	}
	var posted = {
		title:req.body.title,
		body:req.body.content,
		file:fileName,
		user_id:req.session.userId
	};
	var postData = new Post(posted);
	console.log(postData);
	postData.save();
	res.redirect('/');


});
module.exports = router;
