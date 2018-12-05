var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Post = require('../databases/post-collection');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('new-post',{title:'new post'});
});
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.post('/',(req,res)=>{
	var posted = {
		title:req.body.title,
		body:req.body.content
	}
	var postData = new Post(posted);
	console.log(postData);
	postData.save();
	res.redirect('/');


});
module.exports = router;