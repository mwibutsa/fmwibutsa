var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var UserCollection = require('../../databases/user-collection');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.session.userId){
        return  res.redirect('/');
    }
  res.render('login',{title:'Login'});
});
router.post('/', (req, res) => {
    var email = req.body.username;
    var password = req.body.password;
    UserCollection.findOne({email},(error,user)=>{
        if(user){
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                    req.session.userId = user._id;
                    req.session.firstname = user.firstname;
                    req.session.lastname = user.lastname;
                    req.session.email = user.email;
                    console.log(req.session);
                    res.redirect('/');
                }
                else{
                    return  res.redirect('/account/login');
                }
            })
        }
        else{
            return res.redirect('/account/login');
        }
    });
});

module.exports = router;
