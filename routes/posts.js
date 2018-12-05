var express = require('express');
var router = express.Router();
var Post = require('../databases/post-collection');
var url = require('url');
var queryString = require('querystring');

/* GET users listing. */
router.get('/:post_id', async (req, res, next)=> {
  
  const post = await Post.findById(req.params.post_id);
  res.render('post',{title:'blog-post',post});
  
});

module.exports = router;
