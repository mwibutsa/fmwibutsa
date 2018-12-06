var express = require('express');
var router = express.Router();
var UserCollection = require('../../databases/user-collection');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sign-up',{title:'Mwibutsa | New Account'});
});
router.post('/', (req, res) => {
    var userDetails = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    }
    newUser = new UserCollection(
        userDetails
    )
    newUser.save();
     res.redirect('/');

});

module.exports = router;