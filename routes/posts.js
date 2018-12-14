var express = require('express');
var router = express.Router();
var Post = require('../databases/post-collection');
var url = require('url');
var queryString = require('querystring');
var CommentCollection = require('../databases/comment-collection');

/* GET users listing. */
router.get('/:post_id', async (req, res, next)=> {
  
  const post = await Post.findById(req.params.post_id);
  const comments = await CommentCollection.find({post_id:post.id});
  res.render('post',{title:'blog-post',post,comments});
  
});
router.post('/:post_id', (req, res) => {
  var commentData = {
    user_id:req.session.userId,
    post_id:req.params.post_id,
    comment:req.body.comment
  }
  var comment = new CommentCollection(commentData)
  comment.save((error)=>{
  	if (error) {
  		console.log(error);
  	}
  	else{
  		return res.redirect('/posts/'+req.params.post_id);
  	}
  })

});

module.exports = router;
