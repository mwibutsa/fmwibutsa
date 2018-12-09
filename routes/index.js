var express = require('express');
var router = express.Router();
var Posts = require('../databases/post-collection');
/* GET home page. */
router.get('/',  async (req, res) =>{

  const posts = await Posts.find({});
res.render('index', { title: 'Home',posts});
});

module.exports = router;
