var express = require('express');
var router = express.Router();
var UserCollection = require('../../databases/user-collection');

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
          registrationErrors = Object.keys(error.errors).map((key)=>{
                var errorCOmponent = {
                    errorField : error.errors[key].path,
                    errorMessage: error.errors[key].message
                };
                return errorCOmponent;
            });
            req.flash('registrationErrors',registrationErrors);
            console.log('==============New Errors======================');
            console.log(req.flash('registrationErrors'));
            console.log('====================================');
            res.render('sign-up',{title:'New Account',errors:req.flash('registrationErrors')});
        }
        else{
            return res.redirect('/');
        }
    });
    }
    else
    return  res.redirect('/account/new-account');


});
router.get('/', function(req, res, next) {
  res.render('sign-up',{title:'New Account',errors:req.flash('registrationErrors')});
  console.log('==============HHHHHH ERRRRORS======================');
  console.log(req.flash('registrationErrors'));
  console.log('====================================');
});


module.exports = router;