var express = require('express');
var router = express.Router();
var Post = require('../databases/post-collection');

/* GET users listing. */
router.get('/', async (req, res, next)=> {
  
  const post = await Post.findById(req.params.user_id);
  res.render('post',{title:post.title,post});
  
});

module.exports = router;
