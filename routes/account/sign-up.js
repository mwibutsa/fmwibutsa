var express = require('express');
var router = express.Router();
var UserCollection = require('../../databases/user-collection');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.render('sign-up',{title:'New Account',errors:req.session.registrationErrors});
});
router.post('/', (req, res) => {
    if(req.body.password === req.body.cpassword)
    {    
        var userDetails = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
        };
        newUser = new UserCollection(userDetails);
    newUser.save((error,user)=>{
        if(error){
          req.session.registrationErrors =   Object.keys(error.errors).map((key)=>{
                var errorCOmponent = {
                    errorField : error.errors[key].path,
                    errorMessage: error.errors[key].message
                }
                return errorCOmponent;
            });
            console.log('====================================');
            console.log(req.session.registrationErrors);
            console.log('====================================');
            return  res.redirect('/account/new-account');
        }
        else{
            req.session.registrationErrors = null;
            res.redirect('/');
        }
    });
    }
    else
    return  res.redirect('/account/new-account');


});

module.exports = router;