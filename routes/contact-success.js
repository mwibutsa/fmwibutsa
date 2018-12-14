var express = require('express');
var router = express.Router();
var ContactCollection = require('../databases/contact-collection');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact-success',{title:"Contact feedback"});
});
module.exports = router;
